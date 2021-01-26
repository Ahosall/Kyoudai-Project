const Discord   =     require('discord.js');
const chalk     =          require('chalk');
const mongoose  =       require('mongoose');

const os    =             require('os');
const osu   =  require('node-os-utils');

const UserSchema     =  require('../models/users')
const MemberSchema   =  require('../models/members')
const GuildSchema    =  require('../models/guilds')
const SysXPSchema    =  require('../models/sysxp');


module.exports = async (client, message) => {
  if (message.author.bot || message.author.id == client.user.id) return

  let cpu       =                                   process.cpuUsage()    
  let cpuU      =      cpu.user.toString()[0] + cpu.user.toString()[1]    
  let cpuS      =  cpu.system.toString()[0] + cpu.system.toString()[1]    
      cpu       =                                    cpuU / 100 * cpuS
  
  require('../utils/embeds')(client, message);

  const db         =  mongoose
        db.guild   =  await client.getGuild(message.guild);
        db.member  =  await client.getMember(message.guild.members.cache.find(m => m.id == message.author.id).user);
        db.user    =  await client.getUser(message.author);
        db.sysXP   =  await client.getSysXp(message.guild);

				db.sysXPSchema   =  SysXPSchema
        db.guildSchema   =  GuildSchema
        db.userSchema    =  UserSchema
        db.memberSchema  =  MemberSchema

  /**
    * Se por a caso o bot for adicionado em um servidor enquanto ele estiver off
    * este script ira adicionar os dados necessários.
    */
	if(!db.guild) {
	  let msg = await message.channel.send('**Registrando servidor no database ...**')

	  const newGuild = await client.createGuild({
	    guildId: message.guild.id,
	    guildName: message.guild.name,

	    ownerName: message.guild.members.cache.find(m => m.id == message.guild.ownerID).user.username,
	    ownerId: message.guild.ownerID,
	      
	  }).then(async () => {
	    
	    return setTimeout(()=> {
	      msg.edit('**Servidor registrado.**').then(m => {
	        m.delete({timeout: 3000})
	      })
	    }, 1000)
	  })
	} 

	if(!db.member) {
	  let msg = await message.channel.send('**Registrando usuário ...**')
	  
	  const newProfile = await client.createMember({
	      id: message.author.id,
	      guild: [{
	      	id: message.guild.id,
	      	level: 1,
					xp: 0,
					requiredXP: 0
	      }]
	    }).then(async () => {
	      if (!db.user) {
	      	client.createUser({
		        id: message.author.id
		      }).then(async () => {            
		        console.log(`[${chalk.yellow('LOG')}]`, message.author.username, 'Registered')
		        return setTimeout(()=> {
		          msg.edit('**Usuário registrado.**').then(m => {
		            m.delete({timeout: 3000})
		          })
		        }, 1000)

		        return msg.delete({timeout: 3000})            
		      }).catch((err) => {
		      	msg.edit('**Erro ao registrar o Usuário.**').then(m => {
		            m.delete({timeout: 3000})
		          })
		        console.log(err)
		      })
	      } else {
	      	msg.edit('**Usuário registrado.**').then(m => {
            m.delete({timeout: 3000})
          })
	      }
	  }).catch((err) => {
	    console.log(err)
	  })
	}

	/**
	  * Sistema de XP
	  */
	if (db.guild.config.sysXP.enabled != false) {
		let level, xp, users;

		users = db.sysXP.users;
		
		for (let i in users) {

			if (users[i].id == message.author.id) {
				level = users[i].level
				xp = users[i].xp
				requiredXP = users[i].requiredXP

				if (xp >= requiredXP) {
					console.log(level);
					let channelLevelUp = db.guild.config.channels.levelUp;
					let sysXPConfig = db.guild.config.sysXP;

					level++

					client.updateSysXP(message.guild, message.author, {
						level: level,
						requiredXP: requiredXP
					})

					if (channelLevelUp.enabled == true) {
						let id = channelLevelUp.id;
						channel = message.guild.channels.cache.get(id);

						if (sysXPConfig.message.enabled == true) {
							channel.send(sysXPConfig.message.text);
						} else {
							channel.send(`Parabéns ${message.author} você subiu para o level **${level}**! \`${xp}/{${requiredXP}}\``);
						}
					}
				} else {
					console.log(users[i]);
					
					let data = users;

					for (let i in await data) {
						if (data[i].id == users[i].id) {
							data[i].xp = xp + 1;
							
							console.log(data)
						}
					}


					/*client.updateSysXP(message.guild, message.author, {
						xp: xp
					})*/

					/*client.updateSysXP(message.guild, { 
						$set: {
							'users': users[i]
						}
					});*/
				}
			}
		}
	}

  let prefix;
	try {
		prefix = db.guild.get('prefix');
	} catch(e) {
		prefix = 'r!';
	}

	if (message.content == '<@!' + client.user.id + '>') {
	  client.fieldsEmbed(client.user.username, '', [
			{ name: 'Prefixo', value: db.guild.prefix },
			{ name: 'Links', value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=268758208)\nWebSite(Em desenvolvimento` }
		], client.user)
	}
  
  if (message.content.indexOf(prefix) !== 0) return

  let args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)

  if (!cmd) return
	
	// if (message.author.id != 683703998729027769 ) return message.reply('Em fase de desenvolvimento.').then((msg) => { msg.delete({ timeout: 5000 }) });

  let cmds = db.member.cmdsExecutados;

  await client.updateMember(message.guild.members.cache.find(m => m.id == message.author.id).user, {
    cmdsExecutados: ++cmds
  })

  // console.log(`[${chalk.magenta('OS')}]`, `──────────────────────────\n    ${chalk.yellow('Uso')}: ${cpu}%\n    ${chalk.yellow('Memória utilizada')}: ${parseInt(process.memoryUsage().rss/1024/1024)}Mb\n    ${chalk.yellow('Latência')}: ${Math.round(client.ws.ping)}ms\n[${chalk.magenta('OS')}] ──────────────────────────\n`)
  console.log(`[${chalk.yellow('LOG')}]`, `${message.author.username} (${chalk.magenta(message.author.id)}) ran the command: ${chalk.yellow(cmd.help.name)}`)   
  if (cmd.conf.onlyguilds && !message.guild) return messsage.reply('teste')

  cmd.run(client, message, args, db)
}
