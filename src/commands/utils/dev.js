const Discord = require('discord.js');

const cmds = require('../../utils/cmdConfig.json');

module.exports = {
  run: async (client, message, args, db) => {
    message.channel.send('Desativado...')
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
