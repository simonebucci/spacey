exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const fetch = require('node-fetch');

  const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
  message.channel.send(file);

    };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "cat",
    category: "Miscelaneous",
    description: "Free cats",
    usage: "cat"
  };
