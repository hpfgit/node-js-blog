const { Schema } = require('./config');
const articleSchema = new Schema({
  title: String,
  content: String,
  author: String,
  tips: String
},{
  versionKey: false,
  timestamps: {
    createAt: "created"
  }
});

module.exports = articleSchema;