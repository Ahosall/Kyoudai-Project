const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    let msg = args.join(' ');
    
    message.channel.send(msg);
  },
  conf: {},
  get help() {
    return {
      name: "say",
      category: "Utils",
      description: "Eu irei repetir as palavras que você usou como argumento.",
      usage: "say Eu sou o melhor bot do server!"
    };
  }
};
