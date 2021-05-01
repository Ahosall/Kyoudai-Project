const Discord = require('discord.js');

const cmds = require('../../utils/cmdConfig.json');

module.exports = {
  run: async (client, message, args, db) => {
    message.channel.send('Aguardando imagem ...').then(async msg => {
      const filter = (user) => {
        if (user.author.id == message.author.id) {
          return user;
        }
      }

      await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
       .then(collected => {
        const answer = collected.first().attachments;

        if (answer != 0) {
          message.channel.send(answer.first().url)
        } else {
          console.log(answer)
        }
      });
     });
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
