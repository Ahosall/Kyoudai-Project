const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {

    if (args.length == 0) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``)

    let msg = args.join(' ');
    
    message.channel.send(msg)
      .then(() => {
        message.delete();
      });
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
