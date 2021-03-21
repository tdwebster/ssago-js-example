module.exports = {
	name: 'commandFinder',
	description: 'finds a given command from a message and match',
	execute(client, message, matchedPrefix) {
  	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  	const commandName = args.shift().toLowerCase();

  	//checks if this is a valid commandName or alias to one
  	var command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  	var regexMatch = false;
  	//deals with not a command.
  	if (!command) {
  		//a response is required so try to regex a match
  		command = client.commands.find(cmd => cmd.regex && cmd.regex.test(message.content));
  	}
  	//if we failed to regex a match
  	if (!command) {
  		//we didn't regex a command so we set it as unknown as we triggered responseRequired
  		command = client.commands.get("unknown");
	 }
   return command;
  }
}
