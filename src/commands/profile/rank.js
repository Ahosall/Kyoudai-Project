const Discord = require('discord.js');

const SysXPSchema = require('../../models/sysxp');
const MemberSchema = require('../../models/members');

module.exports = {
  run: async (client, message, args, db) => {
    if (message.author.id != 683703998729027769) return message.reply('Em desenvolvimento ...');

    let resp = await db.members.sort(function(a,b) {
      return a.xpTotal > b.xpTotal ? -1 : a.xpTotal < b.xpTotal ? 1 : 0;
    });
    
    let place;

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setAuthor(`RANK | ${message.guild.name}`, client.user.displayAvatarURL({ format: "png" }))
      .addFields([])
      

    for (let i in resp) {
      let position = i

      embed.fields.push({ 
        name: `**[${++position}]** \`${client.users.cache.get(resp[i].id).username}\``, 
        value: `Level: \`${resp[i].level}\`\nXP: \`${resp[i].xp}/${resp[i].requiredXP}\`\n XP Total: ${resp[i].xpTotal}` 
      });

      console.log(resp[i])

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
      description: "Use este comando serve para ver o rank de todos os usuários, do seu servidor! Use `rank geral|all` para ver o rank de todos os membros que está no meu banco de dados",
      usage: "rank [geral|all|my(Em dev)]"
    };
  }
};
