module.exports = {
	name: 'owner',
	description: 'Who\'s my owner!',
	aliases: ['master', 'boss'],
	restricted: false,
	hidden: false,
	usage: '<@> who\'s your owner?',
	regex: new RegExp('.*(((o|O)wner)|((m|M)aster)|((b|B)oss))).*'),//match nothing
	execute(client, message, personality) {
		message.reply(`I belong to <@${personality.owner}>!`);
	},
};
