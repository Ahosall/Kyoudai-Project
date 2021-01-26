const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    message.channel.send(`Latência: \`${Math.round(client.ws.ping)}\`ms`);
  },
  conf: {},
  get help() {
    return {
      name: "ping",
      category: "Utils",
      description: "Use este comando para ver meu ping",
      usage: "ping"
    };
  }
};
