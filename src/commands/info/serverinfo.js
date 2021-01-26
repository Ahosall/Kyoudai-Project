const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    message.channel.send('Off')
  },
  conf: {},
  get help() {
    return {
      name: "serverinfo",
      category: "Info",
      description: "Mostra as informações do servidor.",
      usage: "serverinfo <@user>/<id>"
    };
  }
};
