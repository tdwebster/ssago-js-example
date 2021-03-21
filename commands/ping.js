module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: [],
	restricted: false,
	hidden: true,
	usage: '<@> ping',
	regex: new RegExp('a^'),//match nothing
	execute(client, message) {
		if(!client.silent) {
			message.channel.send('Pong.');
		}
	},
};
