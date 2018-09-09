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

commentSchema.post('remove',(document)=>{
  const Article = require('../models/article');
  const User = require('../models/user');
  const {from, article} = document;
  Article.updateOne({_id: article}, {$inc: {commentNum: -1}}).exec();
  User.updateOne({_id: from}, {$inc: {commentNum: -1}}).exec()
  console.log('歘发了')
});

module.exports = commentSchema;