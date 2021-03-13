const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
    let mentionedMember, descriptionEmbed, stateData;

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

    let member = await client.getMember(message.guild.members.cache.find(m => m.id == mentionedMember.id).user);

        mentionedMember.cmdsExecutados = member.cmdsExecutados
        mentionedMember.tester         = member.tester
        mentionedMember.developer      = member.developer

    if (message.author.id != mentionedMember.id) {
      if (mentionedMember.tester == true) {
        descriptionEmbed = `**Testador(a)**\nAqui as informações do(a) <@!${mentionedMember.id}>.`;
      } else if (mentionedMember.developer == true) {
        descriptionEmbed = `**Desenvolvedor(a)**\nAqui as informações do(a) <@!${mentionedMember.id}>.`;
      } else {
        descriptionEmbed = `Aqui as informações do(a) <@!${mentionedMember.id}>.`;
      }
    } else {
      if (mentionedMember.tester == true) {
        descriptionEmbed = `**Testador(a)**\nAqui as suas informações.`;
      } else if (mentionedMember.developer == true) {
        descriptionEmbed = `**Desenvolvedor(a)**\nAqui as suas informações.`;
      } else {
        descriptionEmbed = `Aqui as suas informações.`;
      }      
    }

    let date   = mentionedMember.joinedTimestamp;
    let cargos = mentionedMember.roles.cache.map(r => r).join("\n").replace("@everyone", "");

        game   = mentionedMember.presence.activities.filter(stts => stts.type == "PLAYING")[0]
        music  = mentionedMember.presence.activities.filter(stts => stts.type == "LISTENING")[0]
        status = mentionedMember.presence.activities.filter(stts => stts.type == "CUSTOM_STATUS")[0]
    
    if (game) {
      stateData = {
        name: 'Jogando...',
        value: `Nome do Jogo: **${game.name}**\nStatus no Jogo: \`${game.state}\``
      }
    } else if(music) {
      stateData = {
        name: 'Ouvindo...',
        value: `**${music.details}**\nPor: \`${music.state}\`\nAlbum: *${music.assets.largeText}*`
      }
    } else {
      stateData = {
        name: 'Hmmm...',
        value: 'Este usuário não está jogando nada ...'
      }
    }
    
    if (status != undefined) {
      let verifyStatus = {
        "dnd": "Não pertube.",
        "idle": "Tomando um café.",
        "online": "Pode pertubar hehe ...",
        "offline": "Dando umas voltas ... eu acho ..."
      }
      
      status = verifyStatus[status];      
    } else if(status) {
      status = status.state
    } else {
      status = 'Ele não definiu nada no seu status.'
    }

    client.fieldsEmbed(mentionedMember.user.tag, descriptionEmbed, [
      { 
        name: 'Comandos executados:', value: mentionedMember.cmdsExecutados, inline: true
      },
      {
        name: 'Reputações',
        value: 'Positivas: `Null`\nNegativas: `Null`'
      },
      { name: stateData.name, value: stateData.value, inline: true },
      {
        name: 'Status Personalizado:', value: status, inline: true
      },
      { 
        name: `Entrou no ${message.guild.name}`, 
        value: formatDate('Dia **DD** do **MM** de **YYYY**, às`HH:mm:ss`', date) 
      },
      {
        name: 'Cargos do usuário',
        value: cargos
      }
    ], mentionedMember.user)
  },
  conf: {},
  get help () {
    return {
      name: 'userinfo',
      category: 'Info',
      description: 'Mostra informações suas ou de outro user!',
      usage: `userinfo [@user/id discord]`
    }
  }
}

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