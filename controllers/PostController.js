const Post = require("../models/Post");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/keys.js");

const PostController = {
  async create(req, res) {
    try {
      if(req.body.title != "" && req.body.title != undefined && req.body.content != "" && req.body.content != undefined && req.body != undefined && req.body != {} && req.headers.authorization != undefined && req.headers.authorization != {}){
        const User = jwt.verify(req.headers.authorization, jwt_secret);
        req.body["userId"] = User._id;
        const post = await Post.create(req.body);
        res.status(201).send(post);
      } else {
        console.error("Empty post error.");
        res.status(400).send({ message: "You cannot create a post with empty fields." });
      }
    } catch (error) {
      console.error(error);
      //console.error(error._message+" // "+error.errors+" // "+error.errors);
      res
        .status(500)
        .send({ message: "It's been an error creating the post.", error });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
      res.send({ message: "Post successfully updated.", post });
    } catch (error) {
      console.error(error);
    }
  },

  async getAll(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const posts = await Post.find()
        .populate("comments")
        .limit(limit * 1)
        .skip((page - 1) * limit);
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getById(req, res) {
    try {
      const post = await Post.findById(req.params._id);
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  async getPostsByTitle(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Search too long.");
      }
      const title = new RegExp(req.params.name, "i");
      const post = await Post.find({ title });
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  
  async delete(req, res) {
    try {
        const post = await Post.deleteOne({_id:req.params._id})
    //   const post = await Post.findByIdAndDelete(req.params._id);
      res.send({ post, message: "Post deleted." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "There was a problem trying to remove the publication.",
        });
    }
  },
  async insertComment(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { reviews: { ...req.body, userId: req.user._id } } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your review" });
    }
  },
  async like(req, res) {
    try {
      const existPost = await Post.findById(req.params._id)
      if (!existPost.likes.includes(req.user._id)){
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
  
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { liked: req.params._id } },
          { new: true }
        );
        res.send(post);
      }
      else {
        res.status(400).send({message: 'Crack ya le has dado al like :('})
      }


    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  },
  async dislike(req, res) {
    try {
      const existPost = await Post.findById(req.params._id)
      if (!existPost.likes.includes(req.user._id)){
        const post = await Post.findByIdAndUpdate(
          req.params._id,
          { $push: { likes: req.user._id } },
          { new: true }
        );
  
        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { liked: req.params._id } },
          { new: true }
        );
        res.send(post);
      }
      else {
        res.status(400).send({message: 'Crack ya le has dado al like :('})
      }


    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There was a problem with your like" });
    }
  }
};
module.exports = PostController;