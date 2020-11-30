const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const registerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    set: toLower,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  password2: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
});

function toLower(str) {
  return str.toLowerCase();
}

module.exports = mongoose.model("Register", registerSchema);
