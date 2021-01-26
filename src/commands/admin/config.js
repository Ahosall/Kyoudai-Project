const Discord = require('discord.js');
// const Canvas = require('canvas');
// const canvacord = require('canvacord');

module.exports = {
  run: async (client, message, [option, value, value2], db) => {
  	if (!message.member.hasPermission('ADMINISTRATOR') || message.author.id != 683703998729027769 ) return message.reply('Você não tem as permissões necessárias para fazer isto **:^**. É necessário a permissão de `Administrador`.')

    if (!option) return message.reply(`?? Talvez isso possa ajudá-lo: \`\`\`${db.guild.get('prefix')}${module.exports.help.usage}\`\`\``)
    	
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
		if (value == 'enable') {
			enable('welcome');
			
			await client.customEmbed(`${message.author.tag}`, "GREEN", 'O sistema de boas vindas foi **ATIVADO** neste servidor!\n**Status :** `' + db.guild.config.channels.welcome.enabled + '` → `true`');
		} else if (value == 'disable') {
			disable('welcome');
			
			await client.customEmbed(`${message.author.tag}`, "GREEN", 'O sistema de boas vindas foi **DESATIVADO** neste servidor!\n**Status :** `' + db.guild.config.channels.welcome.enabled + '` → `false`');
		} else if (value == 'message') {
			if (db.guild.config.channels.welcome.enabled) {
				if (value2 == 'enable') {
					enable('wChannel');

					await client.customEmbed(`${message.author.tag}`, "GREEN", 'A mensagem de boas vindas foi **ATIVADA** neste servidor!\n**Status :** `' + db.guild.config.channels.welcome.message.enabled + '` → `true`');
				} else if (value2 == 'disable') {
					disable('wChannel')

					await client.customEmbed(`${message.author.tag}`, "GREEN", 'A mensagem de boas vindas foi **DESATIVADA** neste servidor!\n**Status :** `' + db.guild.config.channels.welcome.message.enabled + '` → `false`');
	
				} else if (value2 == 'value') {
					if (db.guild.config.channels.welcome.message.enabled) {
						update('wMessage', args)

						await client.customEmbed(`${message.author.id}`, "GREEN", 'A mensagem de boas vindas foi **ATUALIZADA** com sucesso.');
					} else {
						await client.errorEmbed(`Oops! Você precisa ativar esse módulo primeiro. \n\n \`${db.guild.config.get('prefix')}config welcome message enable\``)	
					}
				}
			} else {
				await client.errorEmbed(`Oops! Você precisa ativar esse módulo primeiro. \n\n \`${db.guild.config.get('prefix')}config welcome enable\``)	
			}
		} else if (value == 'embed') {
			await client.customEmbed(`${message.author.tag}`, "YELLOW", 'Clique [aqui](url) para poder configurar as Embeds.');
		}
	} else if(option == 'leave') {
		if (value == 'enable') {
			enable('leave');
			
			await client.customEmbed(`${message.author.tag}`, "GREEN", 'O sistema de saída foi **ATIVADO** neste servidor!\n**Status :** `' + db.guild.config.channels.leave.enabled + '` → `true`');
		} else if (value == 'disable') {
			disable('leave');
			
			await client.customEmbed(`${message.author.tag}`, "GREEN", 'O sistema de saída foi **DESATIVADO** neste servidor!\n**Status :** `' + db.guild.config.channels.leave.enabled + '` → `false`');
		} else if (value == 'message') {
			if (db.guild.config.channels.leave.enabled) {
				if (value2 == 'enable') {
					enable('lChannel');

					await client.customEmbed(`${message.author.tag}`, "GREEN", 'A mensagem de saída foi **ATIVADA** neste servidor!\n**Status :** `' + db.guild.config.channels.leave.message.enabled + '` → `true`');
				} else if (value2 == 'disable') {
					disable('lChannel')

					await client.customEmbed(`${message.author.tag}`, "GREEN", 'A mensagem de saída foi **DESATIVADA** neste servidor!\n**Status :** `' + db.guild.config.channels.leave.message.enabled + '` → `false`');
				} else if (value2 == 'value') {
					if (db.guild.config.channels.leave.message.enabled) {
						update('lMessage', args);

						await client.customEmbed(`${message.author.id}`, "GREEN", 'A mensagem de boas vindas foi **ATUALIZADA** com sucesso.');
					} else {
						await client.errorEmbed(`Oops! Você precisa ativar esse módulo primeiro. \n\n \`${db.guild.config.get('prefix')}config leave message enable\``)	
					}
				}
			} else {
				await client.errorEmbed(`Oops! Você precisa ativar esse módulo primeiro. \n\n \`${db.guild.config.get('prefix')}config leave enable\``)	
			}
		} else if (value == 'embed') {
			await client.customEmbed(`${message.author.tag}`, "YELLOW", 'Clique [aqui](url) para poder configurar as Embeds.');
		}
	} else if (option == 'sysXP') {
		if (value == 'enable') {
			if (db.guild.config.sysXP.enabled != true) {
				enable('SysXP')
			
				await client.customEmbed(`${message.author.tag}`, "GREEN", 'O sistema de XP foi **ATIVADO** neste servidor!\n**Status :** `' + db.guild.config.sysXP.enabled + '` → `true`');
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
		} else if (value == "welcome") {
			client.updateGuild(message.guild, { $set: { 'config.channels.welcome.enabled': true }});
		} else if (value == "wChannel") {
			client.updateGuild(message.guild, { $set: { 'config.channels.welcome.message.enabled': true }});
		} else if (value == "leave") {
			client.updateGuild(message.guild, { $set: { 'config.channels.leave.enabled': true }});
		} else if (value == "lChannel") {
			client.updateGuild(message.guild, { $set: { 'config.channels.leave.message.enabled': true }});
		}
	}

	function disable(value) {
		if (value == "SysXP") {
			client.updateGuild(message.guild, { $set: { 'config.sysXP.enabled': false }});
			console.log('OK - SysXP - Disable');
		} else if (value == "welcome") {
			client.updateGuild(message.guild, { $set: { 'config.channels.welcome.enabled': false }});
		} else if (value == "wChannel") {
			client.updateGuild(message.guild, { $set: { 'config.channels.welcome.message.enabled': false }});
		} else if (value == "leave") {
			client.updateGuild(message.guild, { $set: { 'config.channels.leave.enabled': false }});
		} else if (value == "lChannel") {
			client.updateGuild(message.guild, { $set: { 'config.channels.leave.message.enabled': false }});
		}
	}

	function update(name, data) {
		if (name == 'wMessage') {
			client.updateGuild(message.guild, { $set: { 'config.channels.welcome.message.value': data }});
		} else if (name === 'lMesssage') {
			client.updateGuild(message.guild, { $set: { 'config.channels.leave.message.value': data }});
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
