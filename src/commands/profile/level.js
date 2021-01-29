const Discord = require('discord.js');
const canvacord = require('canvacord');

const MemberSchema = require('../../models/members');

module.exports = {
  run: async (client, message, args, db) => {
  	let mentionedMember;

    if(args[0]) {
      if(message.mentions.members.first()) {
        mentionedMember = message.mentions.members.first()
      } else {
        mentionedMember = await client.checkUserID(message, args[0]);
        if (mentionedMember == 404 || mentionedMember == 201) return
      }
    } else {
      mentionedMember = message.member;
    }

    let user = await client.getMember(mentionedMember);

    if (!user) return message.channel.send('Este usuário não está registrado no meu banco de dados.')
    const rank = new canvacord.Rank()
	    .setAvatar(mentionedMember.user.displayAvatarURL({ format: 'png' }))

	    .setCurrentXP(user.xp)
	    .setRequiredXP(user.requiredXP)
	    
      .setLevel(user.level)
      .setRank(user.rank)
	    
      /*
        As cores foram escolhidas pelo meu amigo Moe(se quiserem o contato soh chamar no meu DC).
      */
      .setProgressBar(["#69ebfa", "#68ff54"], "GRADIENT")
	    
      .setUsername(mentionedMember.user.username)
	    .setDiscriminator(mentionedMember.user.discriminator);

		rank.build()
	    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
	  });
  },
  conf: {},
  get help() {
    return {
      name: "level",
      category: "Profile",
      description: "Use este comando para ver o level de um usuário ou o seu",
      usage: "level [<user>]"
    };
  }
};
