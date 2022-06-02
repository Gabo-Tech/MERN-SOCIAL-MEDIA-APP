const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserController = {
  async register(req, res) {
    if(req.body.name != "" && req.body.name != undefined && req.body.email != "" && req.body.email != undefined && req.body.password != "" && req.body.password && undefined ){
      req.body.password = await bcrypt.hash(req.body.password, saltRounds);
      try {
        const user = await User.create({ ...req.body, role: "user" });
        res.status(201).send({ message: "Usuario registrado con exito", user });
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Ha habido un error al crear el usuario."});
      }
    }
    res.status(400).send({ message: "Por favor rellena todos los campos."});
  },
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      const token = jwt.sign({ _id: user._id }, jwt_secret); //creo el token
      if (user.tokens.length > 4) user.tokens.shift();
      user.tokens.push(token);
      await user.save();
      res.send({ message: "Bienvenid@ " + user.name, token });
    } catch (error) {
      console.error(error);
    }
  },
  async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, {
        $pull: { tokens: req.headers.authorization },
      });
      res.send({ message: "Desconectado con éxito" });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Hubo un problema al intentar desconectar al usuario",
      });
    }
  }
};

module.exports = UserController;