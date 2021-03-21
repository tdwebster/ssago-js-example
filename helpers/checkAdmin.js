module.exports = {
	name: 'checkAdmin',
	description: 'checks admin permissions of a user',
	execute(client, message, personality, command) {
    const member = message.member;
    //this needs a big update to go off the database
    if (member && member.user && member.user.id == personality.owner) {
      return true;
    }
    else {
      return !command.restricted;
    }
  }
}
