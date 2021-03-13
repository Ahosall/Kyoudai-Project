const Discord  =  require('discord.js');
const os       =  require('os');
const osu      =  require('node-os-utils')

module.exports = {
  run: function (client, message, args, db) {
    let cpu       =  process.cpuUsage()    
    let cpuU      =  cpu.user.toString()[0] + cpu.user.toString()[1]    
    let cpuS      =  cpu.system.toString()[0] + cpu.system.toString()[1]    
        cpu       =  cpuU / 100 * cpuS
    
    let avatar    =  client.user.displayAvatarURL()
    let date      =  client.user.createdAt;
    let servsize  =  client.guilds.cache.size;
    let usersize  =  client.users.cache.size;

    const embed = new Discord.MessageEmbed()
      .setColor(0x03ffea)
      .setThumbnail(avatar)
      .setTitle(`${client.user.tag}`)
      .setDescription(`Tag: **${client.user.tag}**\nApelido: **${message.guild.me.nickname ? message.guild.me.nickname : 'Não possuo apelido nesse servidor'}**\nId: **${client.user.id}**\n\n<:hehe:683757960698134576> Desenvolvedor: **Feh's#5060**`)
      .addFields([
        { 
          name: "Informações Discord", 
          value: `**Membros:** \`${usersize}\`\n **Canais:** \`${client.channels.cache.size}\``,
          inline: true
        },
        { 
          name: "Servidor", 
          value: `<:terminal:777939086883029012> **Comandos: **\`${client.commands.size}\`\n :pencil: **Prefixo nesse servidor: ** \`${db.guild.prefix}\``,
          inline: true
        },
        { 
          name: "Links",
          value: `[Me adicione](https://discord.com/api/oauth2/authorize?client_id=${process.env.WEB_CLIENT_ID}&permissions=8&scope=bot)\n[Meu Website](Em desenvolvimento)`,
          inline: true
        },
        { 
          name: "Tecnologias Usadas",
          value: `<:javascript:777933616172367892> **Linguagem Principal:** JavaScript\n<:nodeJs:777933616788406304> **Runtime:** Node.js\n<:discordJs:777935566367883334> **Livraria Principal:** Discord.js\n<:host_web:777939086525595728> **Hospedagem:** Local\n<:mongoDB:777933616915283978> **Banco de Dados:** MongoDB`,
          inline: false
        },
        { 
          name: "CPU",
          value: `\`Modelo\`: ${os.cpus()[0].model.split(' @')[0]}\n\`Uso\`: **${cpu}%**\n\`Memória utilizada\`: **${parseInt(process.memoryUsage().rss/1024/1024)}Mb**\n\`Latência\`: **${Math.round(client.ws.ping)}ms**`,
          inline: false
        }
      ])
      .setFooter(`${client.user.tag}`, avatar)
      .setTimestamp();

    
    message.channel.send(embed);
  },
  conf: {},
 get help () {
    return {
      name: 'botinfo',
      category: 'Info',
      description: 'Use este comando para saber mais sobre mim.',
      usage: `botinfo`
    }
  }
}