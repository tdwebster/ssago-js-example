module.exports = {
	name: 'silence',
	description: 'stop talking',
	aliases: [],
	restricted: true,
	hidden: true,
	usage: '<@> shut up',
	regex: new RegExp('.*(((S|s)hut (u|U)p)|silence| mute).*'),
	execute(client, message, args, personality, dbo) {
		message.reply("This is the last thing I'll say for now. I'm now silent and won't execute commands, say unmute to restore me.");
		client.silent = true;
		return;
	},
};
