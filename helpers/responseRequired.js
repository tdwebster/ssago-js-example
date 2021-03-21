module.exports = {
	name: 'responseRequired',
	description: 'checks if a given client should respond to a message',
	execute(client, message, personality) {
		//this function escapes a string ready for a regular expression
		const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		//this generates a regex for the bots prefix
		const prefixRegex = new RegExp(`^(${escapeRegex(personality.prefix)})\\s*`);
		//this generates a regex to check if the bot was the first user tagged
		const initialTagRegex = new RegExp(`^(<@!?${client.user.id}>)\\s*`);
		//this generates a regex for the special DM prefix
		const dmRegex = new RegExp(`^(${escapeRegex(personality.dmPrefix)})\\s*`);

		var matchedPrefix = "";
		if (message.guild === null && dmRegex.test(message.content)) {
			//this is a DM message so check for dmPrefix
			[, matchedPrefix] = message.content.match(dmRegex);
		}
		else if (prefixRegex.test(message.content)){
			//this message starts with the prefix
			[, matchedPrefix] = message.content.match(prefixRegex);
		}
		else if (initialTagRegex.test(message.content))	{
			//the bot is tagged first in this message
			[, matchedPrefix] = message.content.match(initialTagRegex);
		}
		else {
			return [false];
		}
		return [true, matchedPrefix];
	},
};
