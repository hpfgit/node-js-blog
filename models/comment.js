const {db} = require('../schema/config');
const commentScheam = require('../schema/comment');
const Comment = db.model('comment', commentScheam);

module.exports = Comment;