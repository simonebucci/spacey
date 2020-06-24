
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/roadster').then(response => response.json());
  let mission = link.name
  let description = link.details
  let date = link.launch_date_utc
  let patch = link.flickr_images[0]
  let apo = link.apoapsis_au
  let per = link.periapsis_au
  let inclination = link.inclination
  let longitude = link.longitude
  let speed = link.speed_kph
  let earthd = link.earth_distance_km
  let wiki = link.wikipedia


  message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "Tesla Roadster",
        icon_url: client.user.avatarURL
      },

      "thumbnail": {
      "url": patch
    },

      title: mission,
      url: wiki,
      description: description,
      fields: [{
          name: "Launch Date",
          value: date
        },
        {
            name: "Apoapsis",
            value:  `${apo} `
          },
        {
            name: "Periapsis",
            value:  `${per} `
          },
        {
            name: "Inclination",
            value:  `${inclination} `
          },
        {
            name: "Longitude",
            value:  `${longitude} `
          },
        {
            name: "Speed",
            value:  `${speed} Kph`
          },
        {
            name: "Earth distance",
            value:  `${earthd} Km`
          }
      ],
      timestamp: new Date(),
      footer: {
        //icon_url: client.user.avatarURL,
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
  name: "roadster",
  category: "Miscelaneous",
  description: "Tesla Roadster Info",
  usage: "roadster"
};
