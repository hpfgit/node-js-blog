const { Schema } = require('./config');
const objectId = Schema.Types.ObjectId;
const commentSchema = new Schema({
  title: String,
  content: String,
  from: { // 关联users的表
    type: objectId,
    ref: 'users'
  },
  article: {
    type: objectId,
    ref: 'articles'
  },
},{
  versionKey: false,
  timestamps: {
    createAt: "created"
  }
});

module.exports = commentSchema;