const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
    
    /* Embed comum com description */
    client.simpleEmbed = function(description) {        
        let embed = new MessageEmbed()
            .setDescription(description)
            .setColor(0x2F3136)
            .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        
        message.channel.send(embed)
    }
    /* Embed de erro */
    client.errorEmbed = function(description) {
        let embed = new MessageEmbed()
            .setTitle(`**Erro ${message.author.tag}**`)
            .setDescription(`${description}`)
            .setColor('RED')
            .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(embed)
    }
    /* Embed com title e description */
    client.customEmbed = function(title, color, description) {
        let embed = new MessageEmbed()
            .setTitle(`${title}`)
            .setColor(color)
            .setDescription(`${description}`)
            .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        message.channel.send(embed)
    }

    /* Embed com title, description, fields, e author */
    client.fieldsEmbed = function(title, description, fields, user, guild) {
        let embed = new MessageEmbed()
            .setTitle(`${title}`)
            .setDescription(`${description}`)
            .setColor('RANDOM')
            .addFields(fields)
            .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

            if (user) {
                embed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
            } else if(guild) {
                embed.setThumbnail(guild.iconURL({ dynamic: true }))
            }

        message.channel.send(embed)
    }
}