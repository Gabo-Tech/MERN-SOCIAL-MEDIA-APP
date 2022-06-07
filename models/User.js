const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const UserSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Please fill in your name"],
      },
      email: {
        type: String,
        match: [/.+\@.+\..+/, "This is not a valid email"],
       unique: true,
        required: [true, "Pleasefill in your email"],
      },
      password: {
        type: String,
        required: [true, "Please fill in your password"],
      },
      age: {
        type: Number,
        required: [true, "Please fill in your age"],
      },
      role: String,
      tokens: [],
      commentsIds: [{ type: ObjectId, ref: 'Comment' }],
      liked: [{ type: ObjectId, ref: 'Post' }],
    },
    { timestamps: true }
  );  

UserSchema.methods.toJSON = function() {
    const user = this._doc;
    delete user.tokens;
    delete user.password;
    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;