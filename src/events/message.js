const Discord   =     require('discord.js');
const chalk     =          require('chalk');
const mongoose  =       require('mongoose');

const os    =             require('os');
const osu   =  require('node-os-utils');

const UserSchema     =  require('../models/users')
const MemberSchema   =  require('../models/members')
const GuildSchema    =  require('../models/guilds')


module.exports = async (client, message) => {
  if (message.author.bot || message.author.id == client.user.id) return

  let cpu       =                                   process.cpuUsage()    
  let cpuU      =      cpu.user.toString()[0] + cpu.user.toString()[1]    
  let cpuS      =  cpu.system.toString()[0] + cpu.system.toString()[1]    
      cpu       =                                    cpuU / 100 * cpuS
  
  require('../utils/embeds')(client, message);

  const db         =  mongoose
        db.guild   =  await client.getGuild(message.guild);
        db.member  =  await client.getMember(message.member.user);
        db.user    =  await client.getUser(message.author);

        db.guildSchema   =  GuildSchema
        db.userSchema    =  UserSchema
				db.memberSchema  =  MemberSchema
		
				db.members = await client.getMembers()

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
	} else {
		/*
		 * Sistema de XP
		 */
		if (db.guild.config.sysXP.enabled) {
			const cooldown = new Set()
			
			let level, xp, requiredXP, user;

			if (!cooldown.has(message.author.id)) {
				if (db.member) {
					level      =      db.member.level;
					xp         =         db.member.xp;
					xpTotal    =    db.member.xpTotal;
					requiredXP = db.member.requiredXP;
					user       = 	message.member.user;

					let config  = db.guild.config.channels;
					    levelUp = config.levelUp

					if (xp >= requiredXP) {
						await client.updateMember(user, { 
							level: ++level,
							xp: 0,
							requiredXP: 2*requiredXP
						});
						

						if (levelUp.enabled) {
							let id  = levelUp.channel;
							channel = message.guild.channels.cache.get(id);

							msg     = levelUp.message
							msg     = await client.changeParams(msg, false, message.member);

							channel.send(msg);
						} else {
							message.channel.send(`Parabéns ${message.author} você subiu para o level **${level}**! \`#${db.member.rank}\``);							
						}
					} else {
						await client.updateMember(user, {
							xp: ++xp,
							xpTotal: ++xpTotal
						});
					}
				}
				// Script alterar a posição de todos os usuários.
				let resp = await db.members.sort(function(a,b) {
		      return a.xpTotal > b.xpTotal ? -1 : a.xpTotal < b.xpTotal ? 1 : 0;
		    });

		    for (let i in resp) {
		    	let position = i;
		    	let users = message.guild.members.cache.find(m => m.id == resp[i].id).user;

	        await client.updateMember(users, {
						rank: ++position
					});
				}
				
				cooldown.add(message.author.id)
				setTimeout(() => { cooldown.delete(message.author.id) }, 120000)
			}
		}
	}

	if(!db.member) {
	  let msg = await message.channel.send('**Registrando usuário ...**')
	  
	  const newProfile = await client.createMember({
		  id: message.author.id,
		  rank: 0,
		  requiredXP: 10
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

	if (message.content == '<@!' + client.user.id + '>') {
	  client.fieldsEmbed(client.user.username, '', [
			{ name: 'Prefixo', value: db.guild.prefix },
			{ name: 'Links', value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=268758208)\nWebSite(Em desenvolvimento` }
		], client.user)
	}

  let prefix;

	try {
		prefix = db.guild.get('prefix');
	} catch(e) {
		prefix = 'k!';
	}
	  
  if (message.content.indexOf(prefix) !== 0) return

  let args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)

  if (!cmd) return
	
  if (db.member.tester == false && db.member.developer == false) return message.reply('Em fase de desenvolvimento.').then((msg) => { msg.delete({ timeout: 5000 }) });

  let cmds = db.member.cmdsExecutados;

  await client.updateMember(message.guild.members.cache.find(m => m.id == message.author.id).user, {
    cmdsExecutados: ++cmds
  })

  // console.log(`[${chalk.magenta('OS')}]`, `──────────────────────────\n    ${chalk.yellow('Uso')}: ${cpu}%\n    ${chalk.yellow('Memória utilizada')}: ${parseInt(process.memoryUsage().rss/1024/1024)}Mb\n    ${chalk.yellow('Latência')}: ${Math.round(client.ws.ping)}ms\n[${chalk.magenta('OS')}] ──────────────────────────\n`)
  console.log(`[${chalk.yellow('LOG')}]`, `${message.author.username} (${chalk.magenta(message.author.id)}) ran the command: ${chalk.yellow(cmd.help.name)}`)   
  if (cmd.conf.onlyguilds && !message.guild) return messsage.reply('teste')

  cmd.run(client, message, args, db)
}
