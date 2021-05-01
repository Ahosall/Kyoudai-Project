const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
  	if (!message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS']) || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão de `Administrador`.')

  	let option = args.join(' ')

    if (!option) {
      client.customEmbed(message.author.tag, "RANDOM", 'Olá! Existe dois métodos para me configurar, um deles eh me configurar por aqui mesmo, e o outro é pelo meu WebSite.\nBom ... se você quiser me configurar por aqui digite `' + db.guild.prefix + 'config here` eu irei enviar uma embed perguntando o que você quer configurar.\nAgora se você quiser me configurar pelo WebSite clique [aqui](Em desenvolvimento)')
    } else if (option.toLowerCase() == "here") {

      init()

      async function init() {
        let help = new Discord.MessageEmbed()
          .setTitle(`Olá ${message.author.username}!`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`Olá ${message.author}, como posso-lhe ajudar ?`)
          .addFields([
            { name: '**SysXP**', value: 'Você quer configurar o sistema de XP do servidor?' },
            { name: '**Channels**', value: 'Ou você quer configurar os canais de `Punição`, de `Logs`, ou de `LevelUP`?' },
            { name: '**Prefix**', value: 'Tbm tem como configurar o prefixo por aqui ...' }
          ]);

          await message.channel.send(help).then(async msg => {
            const filter = (user) => {    
              if (user.author.id == message.author.id) {
                return user;
              }
            };

            await message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
             .then(collected => {
              const comando = collected.first().content;

              if (comando.toLowerCase() == "sysxp") {
                
                client.execute(message, db, 'SysXP');
                
              } else if (comando.toLowerCase() == "channels") {
                let nameServer = message.guild.name;

                client.execute(message, db, 'Channels');

              } else {
                message.channel
                 .send(`Não conheço o paramentro \`${comando}\` ... gostaria de tentar novamente ? ([S]im/[N]ão])`)
                  .then(async msg => {
                   message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
                    .then(collected => {
                      let result = collected.first().content;
                      
                      if (result.toLowerCase()[0] == 's') {
                        init();
                      } else if (result.toLowerCase()[0] == 'n') {
                        message.reply('Certo então ... *byee*~');
                      } else {
                        message.reply('Bom ... eu acho q não neh ? ... *byee*~');
                      }
                    }).catch((e) => {
                      console.log(err)
                   });
                 });
              }
            }).catch(err =>{
              console.log(err)
            });
          });
        }
      }




  },
  conf: {},
  get help() {
    return {
      name: "config",
      aliases: ['conf', 'settings'],
      category: "Administration",
      description: "Use este comando para me configurar. Use `r!config help` para saber todas as minhas configurações.",
      usage: "config [<name-config>|help] (options)"
    };
  }
};
