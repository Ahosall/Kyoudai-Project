const mongoose = require('mongoose')

const UserSchema = require('../models/users')
const MemberSchema = require('../models/members')
const GuildSchema = require('../models/guilds')

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
    };
    
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
              return message.guild.members.cache.find(m => m.id == id)
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
          }
      console.log(result)
      return result;
    }
}