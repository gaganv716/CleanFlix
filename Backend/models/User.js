const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  age: Number,
  country: String,
  preferences: [String],
  profileImage: String, // 🔥 base64 string
});

module.exports = mongoose.model('User', userSchema);
