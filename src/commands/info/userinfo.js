const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    message.channel.send('Off')
  },
  conf: {},
  get help() {
    return {
      name: "userinfo",
      category: "Info",
      description: "Mostra as informações de um usuário.",
      usage: "userinfo <@user>/<id>"
    };
  }
};
