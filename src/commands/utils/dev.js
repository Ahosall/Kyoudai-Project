const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    if (message.atuhor.id != message.author.id != 683703998729027769) return message.reply('Você não tem permissão para usar este comando ...');
  },
  conf: {},
  get help() {
    return {
      name: "dev",
      category: "Utils",
      description: "Este comando é reservado para os meus desenvolvedores",
      usage: "dev"
    };
  }
};
