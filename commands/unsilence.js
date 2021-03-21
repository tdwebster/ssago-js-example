module.exports = {
	name: 'unsilence',
	description: 'Start talking',
	aliases: [],
	restricted: true,
	hidden: true,
	usage: '<@> unmute',
	regex: new RegExp('.*(unsilence|unmute|talk to me).*'),
	execute(client, message, args, personality, dbo) {
		client.silent = false;
		message.reply("I'm now active and will execute commands. Say mute to stop.");
		return;
	},
};
