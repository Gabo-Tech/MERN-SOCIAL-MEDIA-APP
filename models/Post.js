const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Plases fill in the title"],
      },
      content: {
        type: String,
        required: [true, "Please fill in the content"],
      },
    comments: [{ type: ObjectId, ref: "Comment"}],
    likes: [{ type: ObjectId }],
    userId: String,
    image: Buffer
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;