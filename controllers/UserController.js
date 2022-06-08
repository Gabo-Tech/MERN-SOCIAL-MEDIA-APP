const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const transporter = require("../config/nodemailer");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = {
  async register(req, res) {
    if(req.body.name != "" && req.body.name != undefined && req.body.email != "" && req.body.email != undefined && req.body.password != "" && req.body.password != undefined && req.body != undefined && req.body != {}){
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      try {
        const user = await User.create({ ...req.body, role: "user" });
        // const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'24h'});
        // const url = 'https://social-media-api-gabriel.herokuapp.com/users/confirm/'+emailToken;
        // await transporter.sendMail({
        //      to:req.body.email,
        //      subject:"Confirmation",
        //      html:`<h3>Bienvenido, estás a un paso de registrarte</h3>
        //      <a href="${url}" style="">Click to confirm you signed up</a>`,
        // });
        res.status(201).send({ message: "User registered succesfully!", user });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "It's been an error creating the user."});
      }
    } else {
      res.status(400).send({ message: "Please fill in all the fields."});
    }
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email
      });
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log(JSON.stringify(user.tokens));
      const token = jwt.sign({ _id: user._id }, jwt_secret); //creo el token
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();

      res.send({ message: "Hi there " + user.name + "!", token });
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Logged out succesfully." });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "It's been an issue trying to log out.",
      });
    }
  },
  async getInfo(req, res) {
    try {
      const user = await User.findById(req.user._id)
      .populate("commentsIds")
      .populate("liked")

      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
  async confirm(req, res) {
    try {
      await User.updateOne(
        { confirmed: true },
        {
          email: req.params.email,
        }
      );
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
    }
  }
};

module.exports = UserController;