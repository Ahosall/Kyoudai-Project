const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {

    let verifyLevels = {
        "NONE": "Ser gado", 
        "LOW": "Ser esperto", 
        "MEDIUM": "Ser badass",
        "HIGH": "Renascer", 
        "VERY_HIGH": "Viajar entre mundos"
      }

    let nameServer = message.guild.name;
          idServer = message.guild.id
         imgServer = message.guild.iconURL({ dynamic: true })
        moderation = verifyLevels[message.guild.verificationLevel]
     membersServer = message.guild.members.cache.size

        dayCreateServer = formatDate('DD', message.channel.guild.createdAt)
        mesCreateServer = formatDate('MM', message.channel.guild.createdAt)
        anoCreateServer = formatDate('YYYY', message.channel.guild.createdAt)

           dayNow = formatDate('DD', Date.now())
           mesNow = formatDate('MM', Date.now())
           anoNow = formatDate('YYYY', Date.now())

           dayToDay = dayNow - dayCreateServer
           mesToMes = mesNow - mesCreateServer
           anoToAno = anoNow - anoCreateServer

           dateServer = `${anoToAno} anos ${mesToMes} meses e ${dayToDay} dias`;

         categorys = message.guild.channels.cache.filter(channel => channel.type == 'category').size
          channels = message.guild.channels.cache.size
             voice = message.guild.channels.cache.filter(channel => channel.type == 'voice').size
              text = message.guild.channels.cache.filter(channel => channel.type == 'text').size
            humans = message.guild.members.cache.filter(member => !member.user.bot).size
             owner = message.guild.owner.user
              bots = message.guild.members.cache.filter(member => member.user.bot).size


    client.fieldsEmbed(`${nameServer} - (${idServer})`, `Aqui todas as informações do servidor **${nameServer}**.`, [
      { name: 'Fundador', value: `${owner.tag} - (\`${owner.id}\`)` },
      
      { name: 'Membros', value: `\`${membersServer}\``, inline: true },
      { name: 'Humanos', value: `\`${humans}\``, inline: true },
      { name: 'Bots', value: `\`${bots}\``, inline: true },

      { name: 'Categorias', value: `\`${categorys}\`` },
      { name: 'Canais', value: `\`${channels}\``, inline: true},
      { name: 'Voz', value: `\`${channels}\``, inline: true },
      { name: 'Texto', value: `\`${channels}\``, inline: true },
      
      { name: 'É necessário...', value: `${moderation} para fazer parte deste SV.`, inline: false },
      { name: 'O server possui...', value: dateServer }
    ], false, message.guild)
  },
  conf: {},
  get help() {
    return {
      name: "serverinfo",
      category: "Info",
      description: "Mostra as informações do servidor.",
      usage: "serverinfo <@user>/<id>"
    };
  }
};

/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}