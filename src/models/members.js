const mongoose = require("mongoose")

const MemberSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    cmdsExecutados: {
      type: Number,
      default: 0
    },
    rank: {
      type: Number
    },
    coins: {
      type: Number,
      default: 0
    },
		sysXP: {
      geral: {
        level: {
          type: Number,
          default: 1
        },
        xp: {
          type: Number,
          default: 0
        },
        requiredXP: {
          type: Number,
          default: 0
        }
      },
      guild: {
        type: Array
      }
    },
    daily: {
      type: String,
      default: "0000"
    }
})

module.exports = mongoose.model('Member', MemberSchema)