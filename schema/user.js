const { Schema } = require('./config');
const userSchema = new Schema({
  username: String,
  password: String
},{
  versionKey: false
});

module.exports = userSchema