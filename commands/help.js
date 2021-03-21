module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	restricted: false,
	hidden: true,
	usage: '<@> help [command name]',
	regex: new RegExp('.*(help).*'),//match nothing
	execute(client, message, personality) {
		const data = [];
		const { commands } = message.client;

		var args = message.content.trim().split(/ +/);
		var helpRegex = new RegExp('.*(help).*');
		var arg0 = args.shift();
		if(!helpRegex.test(arg0)){
			arg0 = args.shift();
		}
		console.log(args);
		if (!args.length) {
			data.push('Here\'s a list of all my commands:');
			var list = [];
			commands.forEach((command) => {
				var include = true;
				if (command.restricted){
					//TODO: add a check if the person requesting help is an admin
					include = false;
				}
			  if (command.hidden) {
					//skip this as it's hidden
					include = false;
				}
				if (include) {
					list.push(command.name);
				}
			});
			data.push(list.join(', '));
			data.push(`\nYou can send \`${personality.prefix}help [command name]\` to get info on a specific command!`);
			return message.author.send(data, { split: true })
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands!');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you!');
				});
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases && command.aliases.length) {
			data.push("You can use any of these aliases instead of the command name.")
			data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		}
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) {
			data.push(`**Usage:** ${personality.prefix}${command.name} ${command.usage}`);
		}
		else {
			data.push(`**Usage:** ${personality.prefix}${command.name}`);
		}
		if (command.restricted) data.push(`**Admin Only:** ${command.restricted}`);

		message.channel.send(data, { split: true });
	},
};
