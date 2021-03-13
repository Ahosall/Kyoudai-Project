const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {

    let resp = await db.members.sort(function(a,b) {
      return a.rank > b.rank ? 0 : a.rank < b.rank ? 1 : -1;
    });
    
    let place;

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setAuthor(`RANK | ${message.guild.name}`, client.user.displayAvatarURL({ format: "png" }))
      .addFields([])

    for (let i in resp) {
      let position = i

      embed.fields.push({ 
        name: `[**${++position}**] | ${client.users.cache.get(resp[i].id).username} | ||${resp[i].id}||`, 
        value: `Level: \`${resp[i].level}\`\nXP: \`${resp[i].xp}/${resp[i].requiredXP}\`\n XP Total: \`${resp[i].xpTotal}\`` 
      });

      if (resp[i].id == message.author.id) {
        place = position;
      } 
    }

    embed.setFooter(`Sua posição no rank é #${place}`, message.author.displayAvatarURL({ format: 'png' }))
    
    message.channel.send({ embed: embed });
  },
  conf: {},
  get help() {
    return {
      name: "rank",
      category: "Profile",
      description: "Use este comando para ver o rank de todos os membros do seu servidor!\n Use `rank geral|all` para ver o rank de todos os usuários que está no meu banco de dados",
      usage: "rank [geral|all|my](Em dev)"
    };
  }
};
