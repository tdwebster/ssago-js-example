module.exports = {
	name: 'updateStatus',
	description: 'randomly update the status',
	execute(client, personality) {
		//one in hundred chance of update
    var statusUpdate = Math.floor(Math.random()*100);
  	if(statusUpdate === 0)
  	{
			//pick a random new status
      var choice = Math.floor(Math.random()*Math.min(personality.statusType.length, personality.statusActivity.length));
    	client.user.setActivity(personality.statusActivity[choice], { type: personality.statusType[choice] });
  	}
  }
}
