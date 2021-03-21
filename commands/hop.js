module.exports = {
	name: 'hop',
	description: 'Hop!',
	aliases: ['jump', 'air'],
	restricted: false,
	hidden: false,
	usage: '<@> hop',
	regex: new RegExp('a^'),//match nothing
	execute(client, message, personality) {
		const r = Math.floor(Math.random() * personality.jump.length);
		if(!client.silent) {
			message.channel.send(personality.jump[r]);
		}
	},
};
