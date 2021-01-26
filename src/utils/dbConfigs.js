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
					channel: '123456789123456789',
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
					channel: '123456789123456789',
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
				logs: {
					enabled: false,
					channel: '123456789123456789'
				},
				punishment:  {
					enabled: false,
					channel: '123456789123456789',
					ban: {
						message: 'Mensagem de ban.'
					},
					mute: {
						message: 'Mensagem de mute.'
					},
					warn: {
						message: 'Mensagem de warn.'
					}
				}
			}
		}
	}
}