exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/launches/next').then(response => response.json());
  let mission = link.mission_name
  let description = link.details
  let date = link.launch_date_local
  let patch = link.links.mission_patch_small
  let n = link.flight_number
  let ls = link.launch_site.site_name_long
  let load = link.rocket.second_stage.payloads[0].payload_type
  let loadid = link.rocket.second_stage.payloads[0].payload_id
  let rocket = link.rocket.rocket_name


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
          name: "Rocket",
          value: `${rocket} `
        },
        {
          name: "Payload",
          value: `${loadid} `
        },
        {
          name: "Payload Type",
          value: `${load} `
        },
        {
          name: "Launch site",
          value: `${ls} `
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
  name: "nextlaunch",
  category: "SpaceX",
  description: "Next SpaceX launch",
  usage: "nextlaunch"
};
