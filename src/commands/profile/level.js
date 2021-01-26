const Discord = require('discord.js');
const canvacord = require('canvacord');

const MemberSchema = require('../../models/members');

module.exports = {
  run: async (client, message, args, db) => {
  	let userData = {};
  	
  	await db.member.sysXP.guild.forEach(g => {
  		if (g.id == message.guild.id) {
  			userData.level = g.level
  			userData.xp = g.xp
  			userData.requiredXP = g.requiredXP
  		}
  	})
    
    const rank = new canvacord.Rank()
	    .setAvatar(message.author.displayAvatarURL({ format: 'png' }))
	    .setCurrentXP(userData.xp)
	    .setRequiredXP(userData.requiredXP)
	    .setLevel(userData.level)
	    .setRank(NaN)
	    .setProgressBar(["#000000", "#FFFF00"], "GRADIENT")
	    .setUsername(message.author.username)
	    .setDiscriminator(message.author.discriminator);

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
