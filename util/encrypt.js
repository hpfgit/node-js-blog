const crypto = require('crypto');

module.exports = function(password, KEY='fengyu da shuai bi') {
  const hmac = crypto.createHmac('sha256', KEY);
  hmac.update(password);
  const passwordHmac = hmac.digest('hex');
  return passwordHmac;
}