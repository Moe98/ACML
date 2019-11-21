const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewsReaderSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
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
module.exports = NewsReader = mongoose.model("NewsReader", NewsReaderSchema);