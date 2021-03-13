const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    tag: {
        type: String,
    },
    discriminator: {
        type: String,
    },
    avatar: {
        type: String,
    },
    guilds: {
        type: Array,
    }
})

module.exports = mongoose.model('User', UserSchema)