const mongoose = require('mongoose');
const Discord = require('discord.js');

const UserSchema = require('../models/users');
const MemberSchema = require('../models/members');
const GuildSchema = require('../models/guilds');

module.exports = client => {
  /**
    * Funções para criar, buscar, alterar, e deletar Servidores, Usuários, e Membros.
    */
    client.getGuild = async guild => {
      let Guild = await GuildSchema.findOne({ guildId: guild.id })

      if (Guild) return Guild
      else return;
    };

    client.updateGuild = async (guild, config) => {
      let Guild = await client.getGuild(guild)

      if (typeof Guild !== "object") Guild = {};
      for (const key in config) {
        if (Guild[key] !== config[key]) Guild[key] = config[key];
        else return;
      }
      return await Guild.updateOne(config);
    }

    client.createGuild = async settings => {
      let defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.config.defaultGuild );

      let merged = Object.assign(defaults, settings);
      let newGuild = await new GuildSchema(merged);

      return newGuild.save()
    };

    client.deleteGuild = guild => {
      GuildSchema.deleteOne({ guildId: guild.id })
    };

    client.createUser = async profile => {
      let newProfile = await new UserSchema(profile);
      return newProfile.save()
    };

    client.getUser = async user => {
      let data = await UserSchema.findOne({ id: user.id });

      if (data) return data;
      else return;
    };

    client.updateUser = async (user, data) => {
      let profile = await client.getUser(user);

      for (const key in data) {
        if (profile[key] !== data[key]) profile[key] = data[key];
        else return;
      }
    
      return await profile.updateOne(profile);
    };

    client.deleteUser = async user => {
      UserSchema.deleteOne({ id: user.id })
    };

    client.getMember = async member => {
      let data = await MemberSchema.findOne({ id: member.id });
      
      if (data) return data;
      else return;
    };

    client.getMembers = async member => {
      let data = await MemberSchema.find({});
      
      if (data) return data;
      else return;
    };

    client.createMember = async profile => {
      let newProfile = await new MemberSchema(profile);
      return newProfile.save()
    };

    client.updateMember = async (member, data) => {
      let profile = await client.getMember(member);

      for (const key in data) {
        if (profile[key] !== data[key]) profile[key] = data[key];
        else return;
      }

      return await profile.updateOne(profile);
    };

    client.deleteMember = async member => {
      MemberSchema.deleteOne({ id: member.id })
    };


  /**
    * Funções para validar IDs de Usuários e de Canais
    */
    client.checkUserID = async (message, id) => {
      if (Number(id)) {
        if(id.length >= 18) {
            if (message.guild.members.cache.find(m => m.id == id) != undefined) {
              if (message.guild.members.cache.find(m => m.id == id).user.bot == true) {
                message.channel.send('Foi mal ... mas eu não aceito armazenar bots no meu banco de dados ... ¬.¬')
                return 201
              } else {
                return message.guild.members.cache.find(m => m.id == id)
              }            
            } else {
              message.channel.send('Não encontrei o responsavel deste ID. Onde é que o dono deste id foi parar ? **U^U**')
              return 404
            }            
        } else {
          message.channel.send('Eu acho que este ID não existe ... **([].[]¬**')
          return 404
        }
      } else {
        message.channel.send('Ent ... os IDs são composto somente por numeros não letras .... **=^**')
        return 404
      }
    }

    client.checkChannelID = async (message, id) => {
      if (Number(id)) {
        if(id.length >= 18) {
            if (message.guild.channels.cache.find(c => c.id == id) != undefined) {
              return message.guild.channels.cache.find(ch => ch.id == id)
            } else {
              message.channel.send('Não encontrei o canal responsavel por este ID. Onde é que está este canal ? **U^U**')
              return
            }            
        } else {
          message.channel.send('Eu acho que este ID não existe ... **(O.O¬**')
          return
        }
      } else {
        message.channel.send('Ent ... os IDs são composto somente por numeros não letras .... **=^**')
        return
      }
    }

  /**
    * Função para substituir parametros
    */
    client.changeParams = async (param, user, member, guild) => {
      let result = param
      console.log(result)

          if (user) {
            console.log(result)
            let userDB = await client.getUser(user);
            
                result = result.replace(/{user}/gi, user)
                result = result.replace(/{user.id}/gi, user.id)
                result = result.replace(/{user.name}/gi, user.username)
                result = result.replace(/{user.discriminator}/gi, user.discriminator)
                result = result.replace(/{user.tag}/gi, user.tag)
                result = result.replace(/{user.avatar}/gi, user.displayAvatarURL({ dynamic: true }))
          }

          if (member) {
            console.log(result)
            let memberDB = await client.getMember(member);

                  result = result.replace(/{member}/gi, member)
                  result = result.replace(/{member.id}/gi, member.id)
                  result = result.replace(/{member.name}/gi, member.user.username)
                  result = result.replace(/{member.discriminator}/gi, member.user.discriminator)
                  result = result.replace(/{member.tag}/gi, member.user.tag)
                  result = result.replace(/{member.avatar}/gi, member.user.displayAvatarURL({ dynamic: true }))

            if (memberDB != null) {

              result = result.replace(/{member.rank}/gi, memberDB.rank)
              result = result.replace(/{member.level}/gi, memberDB.level)
              result = result.replace(/{member.xp}/gi, memberDB.xp)
              result = result.replace(/{member.requiredXP}/gi, memberDB.requiredXP)
              result = result.replace(/{member.xpTotal}/gi, memberDB.xpTotal)
            }
          }

          if (guild) {
            console.log(result)
            let guildDB = await  client.getGuild(guild);

                 result = result.replace(/{guild}/gi, guild.name)
                 result = result.replace(/{guild.name}/gi, guild.name)
                 result = result.replace(/{guild.icon}/gi, guild.iconURL({ dynamic: true }))

                 result = result.replace(/{server}/gi, guild.name)
                 result = result.replace(/{server.name}/gi, guild.name)
                 result = result.replace(/{server.icon}/gi, guild.iconURL({ dynamic: true }))
          }
      console.log(result)
      return result;
    }


  client.createEmbed = async (message, type) => {
    if (type == 'welcome') {
      let embed = new Discord.MessageEmbed();

      message.channel.send('Título da Embed ... \n\n `Se você não quiser um título ... digite: none`').then(async msg => {
        const filter = (user) => {
          if (user.author.id == message.author.id) {
            return user;
          }
        }

        await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
         .then(async collected => {
          const answer = collected.first().content;

          if (answer.toLowerCase() != 'none') {
            embed.setTitle(await client.changeParams(answer, null, null, message.guild));
            message.channel.send(embed);
          }

          message.channel.send('Descrição da Embed ... \n\n `Se você não quiser uma descrição ... digite: none`').then(async msg => {
            const filter = (user) => {
              if (user.author.id == message.author.id) {
                return user;
              }
            }

            await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
             .then(collected => {
              const answer = collected.first().content;

              if (answer.toLowerCase() != 'none') {
                embed.setDescription(answer);
                message.channel.send(embed);
              }

              message.channel.send('Imagem para Embed ... \n\n `Se você não quiser uma imagem ... digite: none`').then(async msg => {
                const filter = (user) => {
                  if (user.author.id == message.author.id) {
                    return user;
                  }
                }

                await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
                 .then(collected => {
                  const answer = collected.first();

                  message.channel.send(new Discord.Attachment(answer.content))

                  if (answer.content.toLowerCase() != 'none') {
                    if (answer.attachments.first().size > 0) {
                      embed.setImage(answer.attachments.first().url);
                    } else {
                      embed.setImage(answer.content);
                    }
                    message.channel.send(embed);
                  }

                  message.channel.send('Thumbnail para Embed ... \n\n `Se você não quiser uma imagem ... digite: none`').then(async msg => {
                    const filter = (user) => {
                      if (user.author.id == message.author.id) {
                        return user;
                      }
                    }

                    await message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ["time"] })
                     .then(async collected => {
                      const answer = collected.first();

                      if (answer.content.toLowerCase() != 'none') {
                        try {
                          embed.setThumbnail(answer.attachments.first().url);
                        } catch (e) {
                          embed.setThumbnail(await client.changeParams(answer.content, null, null, message.guild));
                        }

                        message.channel.send(embed);
                      }
                    })
                  })
                })
              })
            })
          })

        })
      })
    } else if (type == 'bye') {
      // em dev ...
    }
  }

  client.execute = async (message, db, param) => {
    let nameServer = message.guild.name
    let config = db.guild.config;
    
    if (param == 'SysXP') {
      let mesg = `Você quer ativar o sistema de XP no seu servidor ? ([S]im/[N]ão)`
      let result = 'true';

      if (db.guild.sysXP == 'true') {
        msg = `Você quer **desativar** o sistema de XP no seu servidor ? ([S]im/[N]ão)`
        result = 'false';
      }

      let embed = new Discord.MessageEmbed()
        .setTitle(`SysXP - ${nameServer}`)
        .setDescription(mesg + `\n\n**Satus**:\n\`${db.guild.sysXP}\``)
        .setColor('YELLOW');

        message.channel.send(embed).then(async msg => {
          const filter = (user) => {    
            if (user.author.id == message.author.id) {
              return user;
            }
          };

          await message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
           .then(async collected => {
            const answer = collected.first().content;

            if (result == 'true' && answer.toLowerCase()[0] == 's') {
              await client.updateGuild(message.guild, {
                config: {
                  sysXP: {
                    enabled: result
                  }
                }
              }).then(() => {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`SysXP - ${nameServer}`)
                  .setDescription('O `sistema de XP` foi **Atualizado**!' + `\n\n**Satus**:\n\`${db.guild.sysXP}\``)
                  .setColor('GREEN');

                message.channel.send(embed);
              }).catch((e) => {
                message.reply('Ops parece que ocorreu um erro no código ...');
              });
            } else if (answer.toLowerCase()[0] == 'n') {
              db.guild.sysXP.enabled = result;
              db.save();

              message.channel.send('O `Sistema de XP` foi **Desativado** com sucesso!')
            } else {
              message.channel.send(`Desconheço o paramentro \`${answer}\` ... tentar novamente ? ([S]im/[N]ão)`)
              .then(async msg => {
                message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
                  .then(collected => {
                    let result = collected.first().content;
                    if (result.toLowerCase()[0] == 's') {
                      execute('SysXP');
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
          });
        });
    } else if(param == 'Channels') {
      let mesg       = `Quais canais você deseja configurar?`
      let result     = 'true';

      let embed = new Discord.MessageEmbed()
        .setTitle(`SysXP - ${nameServer}`)
        .setDescription(mesg)
        .addFields([
          { name: 'Entrada', value: 'Configurar mensagems de boas vindas, imagens, embeds, ou texto ...' },
          { name: 'Saída', value: 'Configurar mensagems de saída, imagens, embeds, ou texto ...' },
          { name: 'Punishment', value: 'Configurar o canal onde eu irei relatar cacda punição ...' }
        ])
        .setColor('RANDOM');

        message.channel.send(embed).then(async msg => {
          const filter = (user) => {    
            if (user.author.id == message.author.id) {
              return user;
            }
          };

          await message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
           .then(collected => {
            const answer = collected.first().content;

            if (answer.toLowerCase() == 'entrada') {

              let embedWelcome = new Discord.MessageEmbed()
                .setTitle(`Entrada - ${nameServer}`)
                .setDescription(`Quais tipos de mensagem você deseja usar?\n\n \
                  ||Você só pode usar um tipo de mensagem.||\n\n \
                  **Imagem** (\`${config.channels.welcome.image.enabled}\`)\n \
                  **Text** (\`${config.channels.welcome.message.enabled}\`)\n \
                  **Embed** (\`${config.channels.welcome.embed.enabled}\`)\n \n
                  \`\`\`\nStatus:\n    ${config.channels.welcome.enabled}\n\nCanal:\n    ${config.channels.welcome.channel}\n\`\`\` \n \
                  **Canal configurado**: [Clique aqui](https://www.site.com/)`)
                .setColor('RANDOM');

              message.channel.send(embedWelcome).then(async msg => {
                const filter = (user) => {
                  if (user.author.id == message.author.id) {
                    return user;
                  }
                };

                await message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
                 .then(collected => {
                  const answer = collected.first().content;

                  if (answer.toLowerCase() == 'imagem') {
                    message.reply('Em desenvolvimento ...')
                  } else if (answer.toLowerCase() == 'embed') {
                    client.createEmbed(message, 'welcome');
                  } else if (answer.toLowerCase() == 'text') {
                    message.reply('Em desenvolvimento ...')
                  } else {
                    message.channel.send(`Desconheço o paramentro \`${answer}\` ... tentar novamente ? ([S]im/[N]ão)`)
                    .then(async msg => {
                      message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
                      .then(collected => {
                        let result = collected.first().content;

                        if (result.toLowerCase()[0] == 's') {
                          execute('Channels');
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

                });
              });
            } else if (answer.toLowerCase() == 'saída') {
              db.guild.sysXP.enabled = result;
              db.save();

              message.channel.send('O `Sistema de XP` foi **Desativado** com sucesso!')
            } else {
              message.channel.send(`Desconheço o paramentro \`${answer}\` ... tentar novamente ? ([S]im/[N]ão)`)
              .then(async msg => {
                 message.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ["time"]})
                  .then(collected => {
                    let result = collected.first().content;

                    if (result.toLowerCase()[0] == 's') {
                      execute('Channels');
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
          });
        });
      }
    }
}
