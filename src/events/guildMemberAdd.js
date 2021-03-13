const Discord = require("discord.js");

module.exports = async (client, member) => {
    let server = await client.getGuild(member.guild);
    let config = server.config.channels.welcome;

    if (config.enabled) {
      if (config.embed.enabled && config.embed.description) {
        let items = config.embed;

        let embed = new Discord.MessageEmbed()
          .setDescription(items.description)
          .setTimestamp();
        items.title ? 
          embed.setTitle(items.title) 
          : "";
        items.footer.enabled
          ? embed.setFooter(items.footerMessage, items.footerImage)
          : "";
        items.thumbnail.enabled
          ? embed.setThumbnail(items.thumbnail.image)
          : "";
        items.image.enabled ? embed.setImage(items.image) : "";
        items.author.enabled
          ? embed.setAuthor(
              items.author.authorMessage,
              items.author.authorImage
            )
          : "";
        
        let channel = await member.guild.channels.cache.get(config.channel);
        if (channel) return channel.send(embed);
      } else {
        if (config.message) {
          let channel = await member.guild.channels.cache.get(config.channel);
          if (channel) return channel.send(config.message);
        }
      }
    }
  
   let user = await client.getUser(member.user);

    if (!user) {
      await client.createUser({
        id: member.id,
        discrimintor: member.discriminator,
        username: member.username,
        tag: `${member.username}#${member.discriminator}`
      });
    }
};
