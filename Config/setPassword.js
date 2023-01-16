const bcrypt = require('bcrypt');
const User = require('../Models/userModel');


User.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, 10);
};

module.exports = setPassword; 