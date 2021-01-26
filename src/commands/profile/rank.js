const Discord = require('discord.js');

const SysXPSchema = require('../../models/sysxp');
const MemberSchema = require('../../models/members');

module.exports = {
  run: async (client, message, args, db) => {
    if (message.author.id != 683703998729027769) return message.reply('Em desenvolvimento ...');

    let resp = await db.sysXP.users.sort(function(a,b) {
      return a.xp > b.xp ? -1 : a.xp < b.xp ? 1 : 0;
    });
    
    let place = "em desenvolvimento"

    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true }))
      .setAuthor(`RANK | ${message.guild.name}`, client.user.displayAvatarURL({ format: "png" }))
      .addFields([])
      .setFooter(`Sua posição no rank é #${place}`, message.author.displayAvatarURL({ format: 'png' }))

    for (let i in resp) {
      embed.fields.push({ name: `**[${resp[i].rank}]** \`${client.users.cache.get(resp[i].id).username}\``, value: `Level: \`${resp[i].level}\` [\`${resp[i].xp}/${resp[i].requiredXP}\`]` })
    } 
    
    message.channel.send({ embed: embed });
/*
      let user = message.author;
      let guild = message.guild;
      
      let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTimestamp();
      
      embed.setAuthor("LEADERBOARD | " + guild.name, guild.iconURL);
      
      let place;
      
      resp.length = 10;
      let xp, level;
      
      let a = 1;
      for (var i in resp) {
        let name;

        try {
          name = await client.users.cache.get(resp[i].id).username;
        } catch (e) {
          name = `${id}`;
        }

        let level, xp, requiredXP;

        resp[i].sysXP.guild.forEach(g => {
          if (g.id == message.guild.id) {
            level = g.level
            xp = g.xp
            requiredXP = g.requiredXP
          }
        })

        embed.addField(`[${a}] ${name}`, `Level: ${level} [${xp}/${requiredXP}]`, false);
        if (resp[i].id == message.author.id) {
          place = a
        }
        a++;
      }
      
      embed.setDescription(`:clipboard: Top 10`);
      
      embed.setFooter(`O teu lugar no rank é #${place}`, user.displayAvatarURL({ format: 'png' }));
      
      //embed.setThumbnail(message.guild.iconURL);
      //*/
      //message.channel.send('Enviado no terminal...').then( msg => msg.delete({timeout: 3000}));
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
