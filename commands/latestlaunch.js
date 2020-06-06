
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/launches/latest').then(response => response.json());
  let mission = link.mission_name
  let description = link.details
  let date = link.launch_date_local
  let patch = link.links.mission_patch_small
  let n = link.flight_number
  let press = link.links.presskit

/*  message.channel.send(mission);
  message.channel.send({files: [patch]});
  message.channel.send(description);
  message.channel.send(date);
*/

  message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "Latest SpaceX Launch",
        icon_url: patch
      },
      "thumbnail": {
      "url": patch
    },
      title: mission,
      url: press,
      description: description,
      fields: [{
          name: "Launch Date",
          value: date
        },
        {
          name: "Flight Number",
          value: n
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© SpaceX API"
      }
    }
  });

  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "latestlaunch",
  category: "Miscelaneous",
  description: "Latest SpaceX launch",
  usage: "latestlaunch"
};
