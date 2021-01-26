const chalk = require('chalk');

module.exports = async (client) => {
  console.log(`[ ${chalk.green('OK')} ] Bot was started completely with ${chalk.yellow(client.users.cache.size)} users on ${chalk.yellow(client.guilds.cache.size)} servers.`);
  console.log(`Logged with ${client.user.tag}`)

   /*
    * PLAYING → Jogando.
    * STREAMING → !
    * LISTENING → Ouvindo.
    * WATCHING → Assitindo.
    */

  let status = [
    { name: `Mencione para ver o meu prefixo.`, type: 'LISTENING' },
    { name: `${client.users.cache.size} Humanos em ${client.guilds.cache.size} servidores.`, type: 'LISTENING' },
    { name: `Em desenvolvimento.`, type: 'WATCHING' },
    { name: 'Me adicione em seu servidor usando o comando de invite ou apenas me mencionando.  =D', type: 'PLAYING' }
  ]

  function setStatus(){
    let randomStatus = status[Math.floor(Math.random()*status.length)]    

    client.user.setPresence({ activity: randomStatus, status: 'dnd' })
  }
  setStatus();
  setInterval(() => {
		setStatus();
	}, 15000)//*/
}
