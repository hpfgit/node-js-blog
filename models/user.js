const {db} = require('../schema/config');
const userScheam = require('../schema/user');
const User = db.model('users', userScheam);

module.exports= User;