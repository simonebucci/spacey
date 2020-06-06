
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/launches/latest').then(response => response.json());
  let mission = link.mission_name
  let description = link.details
  let date = link.launch_date_local
  let patch = link.links.mission_patch_small

  message.channel.send(mission);
  message.channel.send({files: [patch]});
  message.channel.send(description);
  message.channel.send(date);


  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "launchx",
  category: "Miscelaneous",
  description: "Latest SpaceX launch",
  usage: "launchx"
};
