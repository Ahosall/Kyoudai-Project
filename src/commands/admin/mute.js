const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
    if (!message.member.hasPermission('MUTE_MEMBERS') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão para `Mutar` membros.')
    if (args.length == 0) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``)

    let mentionedMember;

    if(args[0]) {
      if(message.mentions.members.first()) {
        mentionedMember = message.mentions.members.first()
      } else {
        mentionedMember = await client.checkUserID(message, args[0]);
        if (mentionedMember == 404 || mentionedMember == 201) return
      }
    } else {
      return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``);
    }

    let config   = db.guild.config
        channels = config.channels

        punishment = channels.punishment
        channel    =  punishment.channel

        msg = await client.changeParams(punishment.mute.message, mentionedMember.user, mentionedMember, message.guild)

        reason = args.slice(1).join(' ');

        if (!reason) {
          reason = "Motivo não definido."
        }

    message.channel.send(`O usuário **${mentionedMember.user.tag}** foi \`silenciado\`!`).then((msg) => {
      msg.delete({ timeout: 15000 })
    })

    if (punishment.enabled && channel != "Null") {
      channel = await message.guild.channels.cache.get(channel);

      let embed = new Discord.MessageEmbed()
        .setTitle(`O usuário ${mentionedMember.user.tag} foi silenciado!`)
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setDescription(msg)
        .addField('Motivo:', `\`${reason}\``)
        .setColor('RANDOM')
        .setFooter(`Banido por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))


      channel.send(embed);
    }
  },
  conf: {},
  get help() {
    return {
      name: "mute",
      category: "Administration",
      description: "Este comando irá silenciar o usuário mencionado.",
      usage: "mute <@user>/<id> [reason]"
    };
  }
};
