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

articleSchema.post('remove',(doc)=>{
  const Comment = require('../models/comment');
  const User = require('../models/user');
  const {_id: artId, author: authorId} = doc;
  User.findByIdAndUpdate(artId, {$inc: {articleNum: -1}}).exec();
  Comment.find({article: artId})
    .then(data=>{
      data.forEach(v => v.remove());
    })
});

module.exports = articleSchema;