const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args, db) => {
  	if (!message.member.hasPermission('ADMINISTRATOR') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão de `Administrador`.')

  	let option = args.join(' ')

    if (!option) {
      client.customEmbed(message.author.tag, "RANDOM", 'Olá! Existe dois métodos para me configurar, um deles eh me configurar por aqui mesmo, e o outro é pelo meu WebSite.\nBom ... se você quiser me configurar por aqui digite `' + db.guild.prefix + 'config here` eu irei enviar uma embed perguntando o que você quer configurar.\nAgora se você quiser me configurar pelo WebSite clique [aqui](Em desenvolvimento)')
    } else if (option.toLowerCase() == "here") {
      let help = new Discord.MessageEmbed()
        .setTitle(`Olá ${message.author.username}!`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription(`Olá ${message.author}, como posso-lhe ajudar ?`)
        .addFields([
          { name: '**Admin**(Administradores)', value: 'Irei mostrar para você todos os meus comandos de administrador.' },
          { name: '**Info**', value: 'Irei mostrar para você todos os meus comandos de informações.' },
          { name: '**Profile**', value: 'Irei mostrar para você todos os meus comandos de profile.' },
          { name: '**Utils**', value: 'Irei mostrar para você todos os meus comandos utéis.' }
        ]);

  		await message.channel.send(help).then(async msg => {
        const filter = (user) => {    
          console.log(user.username)
          return user.id == message.author.id;
        };

        await message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
         .then(collected => {
          const comando = collected.content.first();

          console.log(comando)
        }).catch(err =>{
          console.log(err)
        });
      });
  	}

  },
  conf: {},
  get help() {
    return {
      name: "config",
      category: "Administration",
      description: "Use este comando para me configurar. Use `r!config help` para saber todas as minhas configurações.",
      usage: "config [<name-config>|help] (options)"
    };
  }
};
