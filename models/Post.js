const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    author: {
        type: String,
        unique: true,
        required: [true, "Please indicate the user"],
      },
    title: {
        type: String,
        required: [true, "Plases fill in the title"],
      },
      content: {
        type: String,
        required: [true, "Please fill in the content"],
      },
    likes: [{ type: ObjectId }],
    image: Buffer
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;