This project contains some code to start off a javascript mascot bot usable on the SSAGO Discord server. 

To make your bot you'll need to alter the following files
<ul><li>Add your bots token into the config.json file, don't share your token!</li>
  <li>Edit 'harold.json' to give your bot some personality, you'll need to change the prefix to something unnique to your bot and change the owner to your Discord ID"</li>
  <li>If you renamed 'harold.json' then you'll need to rename it in 'index.js' on line 7.</li>
</ul>

Once you've done this your bot is now up to you! You can use commands as follows, using 'example_command.js' as an example:
<ul><li>"@Harold example blah blah blah" - tag your bot and then use the name as the next word. You can follow this by anything and can access this in the command.</li>
<li>"@Harold sample blah blah blah" - tag your bot and then use any alias.</li>
  <li>"harold!example blah blah blah" - use your prefix then the command name. You can follow this by anything and can access this in the command.</li>
  <li>"harold!example blah blah blah" - use the prefix then the alias, as one word.</li>
  <li>In a DM "!example blah" - in a Direct message you can use the shorter DM prefix</li>
  <li>"@Harold message" - If your bot is tagged and the message matches the regex then the command will be triggered.</li>
</ul>

Commands you might want to alter:
<ul><li>in '/helpers/reactions.js' there is code to automatically react messages, you can add more reactions here.</li>
  <li>'/commands/example_command.js' this is designed for you to copy and modify to make new functions.</li>
  </ul>
  
