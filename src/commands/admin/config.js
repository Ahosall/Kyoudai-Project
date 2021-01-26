const Discord = require('discord.js');
const Canvas = require('canvas');
const canvacord = require('canvacord');

module.exports = {
  run: async (client, message, [option, value, value2], db) => {
  	if (!message.member.hasPermission('ADMINISTRATOR') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão de `Administrador`.')

    if (!option) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
    	
		if (option == 'setPrefix') {
			let prefix = value;

			if (prefix != 'default') {
				await client.updateGuild(message.guild, {
					prefix: prefix
				});

				client.simpleEmbed('Prefixo Alterado com sucesso! \n Agora meu prefixo no ' + message.guild.name + ' é `' + prefix + '`');
			} else {
				client.simpleEmbed('Ok! \n Agora meu prefixo no ' + message.guild.name + ' é `r!`');
			}
		} else if(option == 'welcome') {
			if (value == 'image') {
				if (value2 == 'example') {
					const applyText = (canvas, text) => {
						const ctx = canvas.getContext('2d');

						// Declare a base size of the font
						let fontSize = 70;

						do {
							// Assign the font to the context and decrement it so it can be measured again
							ctx.font = `${fontSize -= 10}px sans-serif`;
							// Compare pixel width of the text to the canvas minus the approximate avatar size
						} while (ctx.measureText(text).width > canvas.width - 300);

						// Return the result to use in the actual canvas
						return ctx.font;
					};
					const canvas = Canvas.createCanvas(700, 250);
					const ctx = canvas.getContext('2d');

					const background = await Canvas.loadImage('https://cdnb.artstation.com/p/assets/images/images/010/369/695/large/geovani-angelo-background.jpg');
					ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

					ctx.strokeStyle = '#74037b';
					ctx.strokeRect(0, 0, canvas.width, canvas.height);

					// Slightly smaller text placed above the member's display name
					ctx.font = '28px sans-serif';
					ctx.fillStyle = '#000000';
					ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

					// Add an exclamation point here and below
					ctx.font = applyText(canvas, `${message.author.tag}!`);
					ctx.fillStyle = '#000000';
					ctx.fillText(`${message.author.tag}!`, canvas.width / 2.5, canvas.height / 1.8);

					ctx.beginPath();
					ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
					ctx.closePath();
					ctx.clip();

					const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));
					ctx.drawImage(avatar, 25, 25, 200, 200);

					const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

					message.channel.send(`Welcome to the server, ${message.author}!`, attachment);
				} else if (value2 == 'example2') {
	        let image = await canvacord.Welcomer.textTitle;
	        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
	        
	        return message.channel.send(attachment);
				}
			}
		} else if (option == 'sysXP') {
			if (value == 'enable') {
				if (db.guild.config.sysXP.enabled != true) {
					enable('SysXP')
				
					await client.customEmbed(`<:ok:683757959997685870> | ${message.author.tag}`, "GREEN", 'O sistema de XP foi **ATIVADO** neste servidor!\n**Status :** `' + db.guild.config.sysXP.enabled + '` → `true`');
				} else {
					client.customEmbed(
						`<:hmmmm:683757969707630714> | ${message.author.tag}`,
						"RED", 
						'O sistema de XP já está **ATIVADO**!\n**Status :** `' + db.guild.config.sysXP.enabled + '`'
					);
				}
			} else if (value == 'disable') {
				if (db.guild.config.sysXP.enabled != false) {
					disable('SysXP')

					await client.customEmbed(
						`<:cry:683757958273826883> | ${message.author.tag}`, 
						"BLUE", 
						'O sistema de XP foi **DESATIVADO** neste servidor!\n**Status :** `' + db.guild.config.sysXP.enabled + '`'
					);
				} else {
					client.customEmbed(
						`<:hmmmm:683757969707630714> | ${message.author.tag}`, 
						"RED", 
						'O sistema de XP já está **DESATIVADO**!\n**Status :** `' + db.guild.config.sysXP.enabled + '`'
					);
				}
			}
		}

		// funções para ativar e salvar dados no DB
		function enable(value) {
			if (value == "SysXP") {
				client.updateGuild(message.guild, { $set: { 'config.sysXP.enabled': true }});
			}
		}

		function disable(value) {
			if (value == "SysXP") {
				client.updateGuild(message.guild, { $set: { 'config.sysXP.enabled': false }});
				console.log('OK - SysXP - Disable');
			}		
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
