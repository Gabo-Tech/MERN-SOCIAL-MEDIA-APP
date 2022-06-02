const Post = require("../models/Post");

const PostController = {
  async create(req, res) {
    try {
      console.log(req.body.author);
      if(req.body.author != "" && req.body.author != undefined && req.body.title != "" && req.body.title != undefined && req.body.content != "" && req.body.content && undefined ){
        const post = await Post.create(req.body);
        res.status(201).send(post);
        return;
      }
      console.error("Empty post error");
      res.status(400).send({ message: "You cannot create a post with empty fields" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el post" });
    }
  },

  async update(req, res) {
    try {
      const post = await Post.findByIdAndUpdate(req.params._id, req.body, { new: true })
      res.send({ message: "Post successfully updated", post });
    } catch (error) {
      console.error(error);
    }
  },

  async getAll(req, res) {
    try {
      const posts = await Post.find();
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
        return res.status(400).send("Busqueda demasiado larga");
      }
      const name = new RegExp(req.params.name, "i");
      const post = await Post.find({ name });
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
      res.send({ post, message: "Post deleted" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          message: "There was a problem trying to remove the publication",
        });
    }
  },
  
};
module.exports = PostController;