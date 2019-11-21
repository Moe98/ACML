const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  favoriteArticles: {
    type: [
        {
          link: {
            type: String,
            required: true
          }
        }
      ],
      default: [],
      required: false
  },
  favoriteAuthors: {
    type: [
        {
          author: {
            type: String,
            required: true
          }
        }
      ],
      default: [],
      required: false
  }
 
});
module.exports = User = mongoose.model("User", UserSchema);