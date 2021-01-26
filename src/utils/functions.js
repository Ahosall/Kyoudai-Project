const mongoose = require('mongoose')

const UserSchema = require('../models/users')
const MemberSchema = require('../models/members')
const GuildSchema = require('../models/guilds')
const SysXPSchema = require('../models/sysxp')

module.exports = client => {
  //funções para pegar guild, user ou member
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

  client.getMembers = async member => {
    let data = await MemberSchema.find({});

    console.log(data);
    
    if (data) return data;
    else return;
  };

  client.getMember = async member => {
    let data = await MemberSchema.findOne({ id: member.id });
    
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

  client.getSysXp = async guild => {
    let SysXP = await SysXPSchema.findOne({ guildId: guild.id })

    if (SysXP) return SysXP    
    else return;
  };

  client.updateSysXP = async (guild, data) => {
    let profile = await client.getSysXp(guild);

    for (const key in data) {
      if (profile[key] !== data[key]) profile[key] = data[key];
      else return;
    }

    console.log(profile)

    return await profile.updateOne(profile);
  };

  // Função para validar id de usuários
  client.checkUserID = async (message, id) => {
    if (Number(id)) {
      if(id.length >= 18) {
          if (message.guild.members.cache.find(m => m.id == id) != undefined) {
            return message.guild.members.cache.find(m => m.id == args[0])
          } else {
            message.channel.send('Não encontrei o responsavel deste ID. Onde é que o dono deste id foi parar ? **U^U**')
            return
          }            
      } else {
        message.channel.send('Eu acho que este ID não existe ... **([].[]¬**')
        return
      }
    } else {
      message.channel.send('Ent os IDs são composto somente por numeros não letras .... **=^**')
      return
    }
  }

  // Função para validar id de channels
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
        message.channel.send('Eu acho que este ID não existe ... **([].[]¬**')
        return
      }
    } else {
      message.channel.send('Ent os IDs são composto somente por numeros não letras .... **=^**')
      return
    }
  }

}