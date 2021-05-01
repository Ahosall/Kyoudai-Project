const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {

    if (args.length == 0) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``)
    let options = args;
    let msg = args.join(' ');


    if (options[0].toLowerCase() == 'c') {
      if(options[1].toLowerCase()) {
        if(message.mentions.channels.first()) {
          mentionedChannel = message.mentions.channels.first();

          return message.reply('Em desenvolvimento ...');
        } else {
          mentionedChannel = await client.checkChannelID(message, args[0]);
          if (mentionedChannel == 404 || mentionedChannel == 201) return
        }
      } else {
        mentionedChannel = message.member;
      }
    } else if (options[0].toLowerCase() == 'dm') {
      if(options[1].toLowerCase()) {
        if(message.mentions.users.first()) {
          mentionedUser = message.users.channels.first();

          return message.reply('Em desenvolvimento ...');
        } else {
          mentionedChannel = await client.checkChannelID(message, args[0]);
          if (mentionedChannel == 404 || mentionedChannel == 201) return
        }
      } else {
        mentionedChannel = message.member;
      }
    } else {
      message.channel.send(msg)
       .then(() => {
        message.delete();
      });
    }
    
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
