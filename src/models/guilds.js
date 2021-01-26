const mongoose = require('mongoose')

const GuildConfig = new mongoose.Schema({
  guildId: {
      type: String,
      unique: true,
      required: true
  },
  guildName: String,

  ownerName: String,
  ownerId: String,

  prefix: {
      type: String,
      required: true,
      default: "r!"
  },
  config: {
    sysXP: {
      enabled: Boolean
    },
    channels: {
      welcome: {
        enabled: Boolean,
        channel: String,
        embed: {
          enabled: Boolean,
          title:  String,
          description: String,
          footer:{
            enabled: Boolean,
            footerImage: String,
            footerMessage: String
          },
          thumbnail: {
            enabled: Boolean,
            image: String
          },
          author: {
            enabled: Boolean,
            authorImage: String,
            authorMessage: String
          },
          image: {
            enabled: Boolean,
            image: String
          }
        },
        message: {
          enabled: Boolean,
          text: String
        }
      },
      leave: {
        enabled: Boolean,
        channel: String,
        embed: {
          enabled: Boolean,
          title:  String,
          description: String,
          footer:{
            enabled: Boolean,
            footerImage: String,
            footerMessage: String
          },
          thumbnail: {
            enabled: Boolean,
            image: String
          },
          author: {
            enabled: Boolean,
            authorImage: String,
            authorMessage: String
          },
          image: {
            enabled: Boolean,
            image: String
          }
        },
        message: {
          enabled: Boolean,
          text: String
        }
      },
      logs: {
        enabled: Boolean,
        channel: String
      },
      punishment: {
        enabled: Boolean,
        channel: String,
        ban: {
          message: String
        },
        mute: {
          message: String
        }, 
        warn: {
          message: String
        }
      }
    }
  }
})

module.exports = mongoose.model('GuildConfig', GuildConfig)