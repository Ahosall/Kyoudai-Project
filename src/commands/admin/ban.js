const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
    // Verifica se o usuário que executou o comando possui a permissão para banir.
    if (!message.member.hasPermission('BAN_MEMBERS') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão para `Banir` membros.');    
    
    // Define mentionedMember.
    let mentionedMember;

    /** Script para verificar se o usuário passou algum argumento,
      * se ele não passar nada o script iá retornar uma dica de como usar o comandd.
      */
    if(args[0]) {
      // Verifica se o argumento passado eh uma menção.
      if(message.mentions.members.first()) {
        // Se for então mentionedMember é o usuário mencionado.
        mentionedMember = message.mentions.members.first();
      } else {
        
        /** Se não for ent executa uma função para verificar se o argumento passado eh um id
          * visite o arquivo functions.js:105 → "src/utils/functions.js"
          */
        mentionedMember = await client.checkUserID(message, args[0]);

        // Se a função retornar 404(Usuário não encontrado) ou 201(O usuário é um bot) então o comando não prossegue
        if (mentionedMember == 404 || mentionedMember == 201) return
      }
    } else {
      
      // Dica para poder usar o comando
      return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``);
    }

    if (mentionedMember.id == message.author.id) {
      return message.reply('Você não pode se `banir`!')
    } else if(mentionedMember.hasPermission('KICK_MEMBER' || 'BAN_MEMBERS')) {
      return message.reply('Você não pode `banir` um usuário que possua as permissçoes de `Banir` ou `Expulsar`!')
    }
    
    let config     = db.guild.config
        punishment = config.channels.punishment // Pega as configurações de punição do banco de dados

        channel    =  punishment.channel // Pega o id do canal onde será enviado as embeds de puniçãp

        /** Pega a mensagem da punição de ban e substitui todos os parametros,
          * visite o arquivo functions.js:151 → "src/utils/functions.js"
          */
        msg = await client.changeParams(punishment.ban.message, mentionedMember.user, mentionedMember, message.guild);

        // Pega o resto dos argumentos que o usuário passou e armazena dentro de uma variavel.
        reason = args.slice(1).join(' ');

        // Se ele não passou mais nenhum argumento,
        if (!reason) {
        
          // Ent define como "Motivo não definido".
          reason = "Motivo não definido.";
        }

    // Aqui envia uma mensagem na DM do usuário falando que ele foi banido.
    mentionedMember.user.send('Você está sendo banido!').then(async msg => {
      await setTimeout(async () => {
        let dmMsg = await client.changeParams(`Você foi banido do servidor **{guild.name}**!\nMotivo: \`${reason}\`\nStaffer: *${message.author.username}*`, false, false, message.guild)
        msg.edit(dmMsg)

        // E finalmente o usuário é banido!
        mentionedMember
          .ban({ reason: reason }) // Coloca a razão do porque ele foi banido
          .then(async () => {
        
          // Se tudo der certo... Envia uma mensagem para o usuário que baniu o membro no mesmo canal.
          message.channel.send(`O usuário **${mentionedMember.user.tag}** foi \`banido\` do servidor!`).then(async (msg) => {

            // Se as mensagem de punição estiver ativada e um canal estiver definido,
            if (punishment.enabled && channel != "Null") {
        
                // Então pega o canal no servidor baseado pelo id e altera a variavel channel
                channel = await message.guild.channels.cache.get(channel);

                // Aqui é cria a embed de punição e envia no canal que foi armazenado no channel
                embed   = new Discord.MessageEmbed()
                  .setTitle(`O usuário ${mentionedMember.user.tag} foi banido do servidor!`)
                  .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
                  .setDescription(msg)
                  .addField('Motivo:', `\`${reason}\``)
                  .setColor('RANDOM')
                  .setFooter(`Banido por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

                channel.send(embed);
            }
        
            // Aqui a apaga a mensagem de alertar que foi enviada no mesmo canal que foi executado o comando.
            msg.delete({ timeout: 15000 });
          });
      }, 5000)
    })
    });
  },
  conf: {},
  get help() {
    return {
      name: "ban",
      category: "Administration",
      description: "Este comando irá banir algum usuário.",
      usage: "ban <@user>/<id>"
    };
  }
};
