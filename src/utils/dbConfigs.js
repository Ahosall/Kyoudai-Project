/* Configurações padrões para quando o bot entrar em um servidor */

module.exports = {
	defaultGuild: {
		config: {
			sysXP: {
				enabled: false
			},
			channels: {
				welcome: {
					enabled: false,
					channel: 'Null',
					message: {
						enabled: false,
						value: ''
					},
					embed: {
						enabled: false,
						title: '',
						description: '',
						footer: {
							enabled: false,
							footerImage:  '{user.avatar}',
							footerText: '{user.tag}'
						},
						thumbnail: {
							enabled: false,
							image: '{user.avatar}'
						},
						author: {
							enabled: false,
							authorMessage: '{user.avatar}',
							authorImage: '{user.tag}'
						},
						image: {
							enabled: false,
							image: '{user.avatar}'
						}
					}
				},
				leave: {
					enabled: false,
					channel: 'Null',
					message: {
						enabled: false,
						value: ''
					},
					embed: {
						enabled: false,
						title: '',
						description: '',
						footer: {
							enabled: false,
							footerImage:  '{user.avatar}',
							footerText: '{user.tag}'
						},
						thumbnail: {
							enabled: false,
							image: '{user.avatar}'
						},
						author: {
							enabled: false,
							authorMessage: '{user.avatar}',
							authorImage: '{user.tag}'
						},
						image: {
							enabled: false,
							image: '{user.avatar}'
						}
					}
				},
				levelUp: {
					enabled: false,
					channel: 'Null',
					message: 'Parabéns {member} você subiu para o level **{member.level}**! `#{member.rank}`'
				},
				logs: {
					enabled: false,
					channel: 'Null'
				},
				punishment:  {
					enabled: false,
					channel: 'Null',
					ban: {
						message: 'O Usuario **{user.tag}** foi banido do servidor!'
					},
					mute: {
						message: 'O Usuario {user} foi silenciado!'
					},
					warn: {
						message: 'O Usuario {user} foi alertado!'
					},
					kick: {
						message: 'O Usuario **{user.tag}** foi expulso!'
					}
				}
			}
		}
	}
}