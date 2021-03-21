module.exports = {
	name: 'example', //this will be the name of your command
	description: 'This is an example of how to write a new command',//this describes what the command does
	aliases: ['examples', 'enghraifft'],//these are alternative names for the command. use [] for no alternatives.
	restricted: false,//if this is true only admins can use the command
	hidden: false,//this command won't be shown in help
	usage: '<@> example',//an example of how you use the command, <@> will be replaced by your bot name.
	regex: new RegExp('a^'),//you can provide a regular expression that will trigger your command, this regex will match nothing
	execute(client, message, personality) {
		//client contains the bot instance, you can use it to interact with discord
		//message is the message that has been sent and triggered the command
		//personality contains the data in the json file

		//do some fun things 
	},
};
