const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    author: String,
    title: String,
    content: String,
    image: Buffer
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;