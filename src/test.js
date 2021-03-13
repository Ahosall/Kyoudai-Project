require('dotenv').config();

if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord   = require('discord.js');
const mongoose  =   require('mongoose');
const Enmap     =      require('enmap');
const chalk     =      require('chalk');
const { join }  =     	require('path');

const { readdirSync } = require('fs');

const client = new Discord.Client({
  disableMentions: 'everyone',
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Enmap()
client.startTime = Date.now()

const db = require('./utils/database');

require("./utils/functions")(client);

client.config = require("./utils/dbConfigs");

module.exports = client

console.log(`[${chalk.yellow('Starting')}] Bot!`)

console.log(`\n[${chalk.yellow('Loading')}] Commands!\n`)

// Load commands
readdirSync(join(__dirname, "commands")).forEach(dir => {
    const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js"));

    commands.forEach(f => {
	  try {
	    const props = require(`./commands/${dir}/${f}`)

	    if (dir == 'admin') {	    	
        console.log('#', props.help.name, `[${chalk.green('status: Ok')}] · ${dir}`)
    	} else if (dir == 'info') {    		
        console.log('#', props.help.name, `[${chalk.green('status: Ok')}] · ${dir}`)
    	} else if (dir == 'profile') {    		
        console.log('#', props.help.name, `[${chalk.green('status: Ok')}] · ${dir}`)
    	} else if (dir == 'utils') {
        console.log('#', props.help.name, `[${chalk.green('status: Ok')}] · ${dir}`)
    	}

	    if (props.init) props.init(client)

	    client.commands.set(props.help.name, props)

	    if (props.help.aliases) {
	      props.alias = true
	      props.help.aliases.forEach(alias => client.aliases.set(alias, props))
	    }
	  } catch (e) {
	    console.log(f, `status: ·:{{[[ ${chalk.red('ERROR')} ]]}}:·`)
	    console.log(e)
	  }
	})
});

console.log(`\nAll commmands have been ${chalk.green('LOADED')}!`);

// Load events
console.log(`\n[${chalk.yellow('LOADING')}] Events.\n`)

readdirSync('./src/events/').forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)
  try {
  	console.log(`[ ${chalk.green('Ok')} ]`, eventName)
  	client.on(eventName, event.bind(null, client))
  } catch(err) {
  	console.log(`[ ${chalk.red('Err')} ]`, eventName)
  	console.log('\n\n', err, '\n\n')
  }
})

console.log(`\nAll events have been ${chalk.green('LOADED')}!`);

db.start('DEV').then(() => console.log(`\n[ ${chalk.green('OK')} ] Connected to MongoDB in DEV`))
  .catch((err) => { console.log(`| ${chalk.red('ERR')} |`, err) });
 
try {
  require('./dashboard/utils/server');
} catch (err) {
  console.log(`| ${chalk.red('ERR')} |`, err)
}

client.login(process.env.AUTH_TOKEN_TEST)
