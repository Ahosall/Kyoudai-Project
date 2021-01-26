const mongoose = require("mongoose")

const SysXPSchema = new mongoose.Schema({
  guildId: {
    type: String,
    unique: true,
    required: true
  },
  users: Array
})

module.exports = mongoose.model('SysXP', SysXPSchema)