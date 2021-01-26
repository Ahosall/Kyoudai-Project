module.exports = {
  defaultGuild: {
  	config: {
  		sysXP: {
	      enabled: false
	    },
			channels: {
		    welcome: {
			  	enabled: false,
			  	channel: '123456',
			  	embed: {
						enabled: false,
						title:  '',
						description: '',
						footer:{
							enabled: false,
							footerImage: '{user.avatar}',
							footerMessage: '{user.tag}'
						},
						thumbnail: {
							enabled: false,
							image: '{user.avatar}'
						},
						author: {
							enabled: false,
							authorImage: '{user.avatar}',
							authorMessage: '{user.tag}'
						},
						image: {
							enabled: false,
							image: '{user.avatar}'
						}
        	},
					message: {
						enabled: false,
						text: 'Bem vindo {user}, ao {guild.name}!'
					}
			  },
			  leave: {
			  	enabled: false,
			  	channel: '123456',
			  	embed: {
						enabled: false,
						title:  '',
						description: '',
						footer:{
							enabled: false,
							footerImage: '{user.avatar}',
							footerMessage: '{user.tag}'
						},
						thumbnail: {
							enabled: false,
							image: '{user.avatar}'
						},
						author: {
							enabled: false,
							authorImage: '{user.avatar}',
							authorMessage: '{user.tag}'
						},
						image: {
							enabled: false,
							image: '{user.avatar}'
						}
        	},
					message: {
						enabled: false,
						text: 'Ateh mais {user.tag} ({user.id}) .. **,_,**'
					}
				},
				logs: {
				  enabled: false,
				  channel: '123456'
				},
				punishment: {
					enabled: false,
					channel: '123456',
					ban: {
						message: 'Mensagem de ban.'
					},
					mute: {
						message: 'Mensagem de mute.'
					}, 
					warn: {
						message: 'Mensagem de alerta.'
					}
				}
			}
		}
  } //configurações padrões pra quando criamos um servidor no mongo
}