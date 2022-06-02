const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = {
  async register(req, res) {
    if(req.body.name != "" && req.body.name != undefined && req.body.email != "" && req.body.email != undefined && req.body.password != "" && req.body.password != undefined && req.body != undefined && req.body != {}){
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      try {
        const user = await User.create({ ...req.body, role: "user" });
        res.status(201).send({ message: "User registered succesfully!", user });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "It's been an error creating the user."});
      }
    }
    res.status(400).send({ message: "Please fill in all the fields."});
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      console.log(isMatch);
      console.log(JSON.stringify(user));
      // const token = jwt.sign({ _id: user._id }, jwt_secret); //creo el token
      // if (user.tokens.length > 4) user.tokens.shift();
      // user.tokens.push(token);
      // await user.save();

      res.send({ message: "Hi there " + user.name + "!", /*token*/ });
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
      .populate({
        path: "comentIds",
        populate: {
          path: "postIds",
        },
      });

      res.send(user);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;