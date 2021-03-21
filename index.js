const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');

// require the json config and personality
var config = require('./config.json');
var personality = require('./harold.json');

//extracts user id from mention
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.get(mention);
	}
}

// create a new Discord client
//{ ws: { intents: ['GUILD_PRESENCES','GUILD_MEMBERS'] }}
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.silent = false;
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// login to Discord with your app's token
client.login(config.token);

const responseRequired = require('./helpers/responseRequired.js');
const reactions = require('./helpers/reactions.js');
const updateStatus = require('./helpers/updateStatus.js');
const checkAdmin = require('./helpers/checkAdmin.js');
const commandFinder = require('./helpers/commandFinder.js')

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', async () => {
	console.log('Ready!');
	updateStatus.execute(client, personality);
});

//on message event
client.on('message', async (message) => {
	//special preamble
	const member = message.member;

	//randomly updates status
	updateStatus.execute(client, personality);

	//checks if message needs reactions added
	reactions.execute(client, message, personality);

	//check if we should respond or not
	var respond = responseRequired.execute(client, message, personality);
	if (!respond[0]) {
		//no response required
		return;
	}

	//try and resolve the message to a command
	var command = commandFinder.execute(client, message, respond[1]);
	if (!command) {
		return;
	}

	//bools to dermine user type
	var memberCanUse = checkAdmin.execute(client, message, personality, command);
	var isBot = member && member.user && member.user.bot;

	// check if member has admin
	if (!memberCanUse && !client.silent) {
		//user doesn't have admin
		//this blocks all commands marked as restricted
		const r = Math.floor(Math.random() * personality.nonAdmin.length);
		message.reply(personality.nonAdmin[r]);
		return;
	}
	try {
		if (command.name === "silence" || command.name === "unsilence") {
			command.execute(client, message, personality);
		}
		else {
			if (!client.silent) {
				//the [] should be args but I don't think we ever need use this
				command.execute(client, message, personality);
			}
		}
	}
	catch (error) {
		console.error(error);
		if (!isBot) {
			const r = Math.floor(Math.random() * personality.error.length);
			if (!client.silent) {
				message.reply(personality.error[r]);
			}
		}
	}
});

client.on('shardError', error => {
	client.logger.send(`A websocket connection encountered an error: ${error}`);
	console.error('A websocket connection encountered an error:', error);
});

client.on('unhandledRejection', error => {
	client.logger.send(`Unhandled promise rejection: ${error}`);
	console.error('Unhandled promise rejection:', error);
});
