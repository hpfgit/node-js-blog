const { Schema } = require('./config');
const objectId = Schema.Types.ObjectId;
const articleSchema = new Schema({
  title: String,
  content: String,
  author: { // 关联users的表
    type: objectId,
    ref: 'users'
  },
  tips: String,
  commentNum: Number
},{
  versionKey: false,
  timestamps: {
    createAt: "created"
  }
});

module.exports = articleSchema;