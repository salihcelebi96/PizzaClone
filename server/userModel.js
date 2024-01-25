// userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: String,
  password: String,
  isChecked1: Boolean,
  isChecked2: Boolean,
  isChecked3: Boolean
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;