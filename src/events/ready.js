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
    /*{ name: 'Yeeeey!!! Primeiro teste do Kyoudai Bot oficial!'},*/
      { name: 'Sendo desenvolvido desde "21/01/2021"'},

    { name: `Mencione para ver o meu prefixo.`, type: 'LISTENING' },
    { name: `${client.users.cache.size} humanos em ${client.channels.cache.size} canais.`, type: 'LISTENING' }
    //{ name: `Em desenvolvimento.`, type: 'WATCHING' }
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
