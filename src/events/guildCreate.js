const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, guild) => {
	let guildDb = await client.getGuild(guild)  

	console.log(`| ${chalk.yellow('LOG')} | ${client.user.username} Joined ${guild.name} (${guild.id})`)

  if (!guildDb) {
    await client.createGuild({
 			guildId: guild.id,
      guildName: guild.name,

      ownerName: guild.members.cache.find(m => m.id == guild.ownerID).user.username,
      ownerId: guild.ownerID
    });
	}
}