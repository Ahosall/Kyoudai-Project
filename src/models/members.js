const mongoose = require("mongoose")

const MemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    coins: {
      type: Number,
      default: 0
    },
    cmdsExecutados: {
      type: Number,
      default: 0
    },
    daily: {
      type: String,
      default: "0000"
    },
    developer: {
      type: Boolean,
      default: false
    },
    warnsCount: {
      type: Number,
      default: 0
    },
		level: {
      type: Number,
      default: 1
    },
    rank: {
      type: Number
    },
    requiredXP: {
      type: Number,
      default: 0
    },
    tester: {
      type: Boolean,
      default: false
    },
    xp: {
      type: Number,
      default: 0
    },
    xpTotal: {
      type: Number,
      default: 0
    }
    
})

module.exports = mongoose.model('Member', MemberSchema)