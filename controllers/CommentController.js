const Comment = require("../models/Comment.js");
const Post = require("../models/Post");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

const CommentController = {
  async create(req, res) {
    try {
        const comment = await Comment.create({...req.body,
            userId: req.user._id
        })
        await User.findByIdAndUpdate(req.user._id, { $push: { commentIds: comment._id } })
        res.status(201).send(comment)
    } catch (error) {
        console.error(error);
    }
},

  async update(req, res) {
    try {
      const comment = await comment.findByIdAndUpdate(
        req.params._id,
        { ...req.body, userId: req.user._id },
        {
          new: true,
        }
      );
      res.send({ message: "Comment successfully updated", comment });
    } catch (error) {
      console.error(error);
    }
  },
  async insertComment(req, res) {
    try {
      const User = jwt.verify(req.headers.authorization, jwt_secret);
      req.body["userId"] = User._id;
      const post = await Post.findByIdAndUpdate(
        req.params._id,
        { $push: { comments: { ...req.body} } },
        { new: true }
      );
      res.send(post);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem with your comment" });
    }
  }
};

module.exports = CommentController;