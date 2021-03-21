module.exports = {
	name: 'unknown',
	description: "I don't know this command.",
	aliases: [],
	restricted: true,
	hidden: true,
	usage: 'Not a useable command.',
	regex: new RegExp('a^'),//match nothing
	execute(client, message, personality) {
		var isBot = member && member.roles.cache && member.roles.cache.some(role => role.name.toLowerCase() === 'mascot');
		if (!isBot  && !client.silent) {
			//tells none bots this is an unknown command (this won')
			const r = Math.floor(Math.random() * personality.unknown.length);
			message.reply(personality.unknown[r]);
			return;
		}
	},
};
