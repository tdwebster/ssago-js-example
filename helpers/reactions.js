module.exports = {
	name: 'reactions',
	description: 'Controls post reactions.',
	execute(client, message, personality) {
		const memeRegex = new RegExp('.*\\b(m|M)eme.*');
		if(memeRegex.test(message.content)) {
			message.react('818791635071795241');//meme spork
		}
		return;
	},
};
