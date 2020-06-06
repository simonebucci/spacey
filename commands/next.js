exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/launches/next').then(response => response.json());
  let mission = link.mission_name
  let description = link.details
  let date = link.launch_date_local
  let patch = link.links.mission_patch_small
  let n = link.flight_number

  message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "Next SpaceX Launch",
        icon_url: patch
      },
      "thumbnail": {
      "url": patch
    },
      title: mission,
      url: "http://google.com",
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
  name: "next",
  category: "Miscelaneous",
  description: "Next SpaceX launch",
  usage: "next"
};
