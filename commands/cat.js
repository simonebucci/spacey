exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const fetch = require('node-fetch');

  var link = await fetch('https://api.thecatapi.com/v1/images/search').then(response => response.json());
  let pic = link[0].url
  message.channel.send(pic);

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
