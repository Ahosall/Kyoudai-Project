const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
    // Verifica se o usuário que executou o comando possui a permissão para expulsar.
    if (!message.member.hasPermission('KICK_MEMBERS') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão para `Expulsar` membros.')

    // Define mentionedMember.
    let mentionedMember;

    /** Script para verificar se o usuário passou algum argumento,
      * se ele não passar nada o script iá retornar uma dica de como usar o comandd.
      */
    if(args[0]) {
      // Verifica se o argumento passado eh uma menção.
      if(message.mentions.members.first()) {
        // Se for então mentionedMember é o usuário mencionado.
        mentionedMember = message.mentions.members.first()
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

    let config   = db.guild.config
        punishment = config.channels.punishment // Pega as configurações de punição do banco de dados

        channel    =  punishment.channel // Pega o id do canal onde será enviado as embeds de puniçãp

        /** Pega a mensagem da punição de kick e substitui todos os parametros,
          * visite o arquivo functions.js:151 → "src/utils/functions.js"
          */
        msg = await client.changeParams(punishment.kick.message, mentionedMember.user, mentionedMember, message.guild)

        // Pega o resto dos argumentos que o usuário passou e armazena dentro de uma variavel.
        reason = args.slice(1).join(' ');

        // Se ele não passou mais nenhum argumento,
        if (!reason) {
          reason = "Motivo não definido."
        }

    // Agora finalmente o usuário é expulso!
    mentionedMember
      .kick(reason) // Coloca a razão do porque ele foi expulso.
      .then(async () => {

      /** Se tudo der certo...
        * Então é enviado na DM do usuário que ele foi banido.
        */
      let dmMsg = await client.changeParams(`Você foi expulso do servidor **{guild.name}**!\nMotivo: \`${reason}\`\nStaffer: *${message.author.username}*`, false, false, message.guild)
      mentionedMember.user.dmChannel.send()

      // Envia uma mensagem para o usuário que expulso o membro no mesmo canal.
      message.channel.send(`O usuário **${mentionedMember.user.tag}** foi \`expulso\` do servidor!`).then(async (msg) => {

        // Se as mensagem de punição estiver ativada e um canal estiver definido,
        if (punishment.enabled && channel != "Null") {

            // Então pega o canal no servidor baseado pelo id e altera a variavel channel
            channel = await message.guild.channels.cache.get(channel);

            // Aqui é cria a embed de punição e envia no canal que foi armazenado no channel
            embed   = new Discord.MessageEmbed()
              .setTitle(`O usuário ${mentionedMember.user.tag} foi expulso do servidor!`)
              .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
              .setDescription(msg)
              .addField('Motivo:', `\`${reason}\``)
              .setColor('RANDOM')
              .setFooter(`Expulso por ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))

            channel.send(embed);
        }
        // Aqui a apaga a mensagem de alertar que foi enviada no mesmo canal que foi executado o comando.
        msg.delete({ timeout: 15000 });
      });
    });
  },
  conf: {},
  get help() {
    return {
      name: "kick",
      category: "Administration",
      description: "Este comando irá expulsar o usuário mencionado.",
      usage: "kick <@user>/<id> [reason]"
    };
  }
};
