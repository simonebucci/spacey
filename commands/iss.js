exports.run = async (client, message, args, level) => {

  const fetch = require('node-fetch');

  var link = await fetch('https://api.wheretheiss.at/v1/satellites/25544').then(response => response.json());
  let latitude = link.latitude
  let longitude = link.longitude
  let altitude = link.altitude
  let velocity = link.velocity


  message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "ISS Info",
        icon_url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/InternationalSpaceStationPatch.png'
      },
      thumbnail: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/InternationalSpaceStationPatch.png"
    },
      title: 'ISS info',
      url: "https://isstracker.spaceflight.esa.int/",
      description: "ISS",
      fields: [{
          name: "Latitude",
          value: `${latitude}`
        },
        {
          name: "Longitude",
          value: `${longitude} `
        },
        {
          name: "Altitude",
          value: `${altitude}Km `
        },
        {
          name: "Velocity",
          value: `${velocity}Km/h `
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© SpaceY"
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
  name: "iss",
  category: "Miscelaneous",
  description: "Info about the International Space Station",
  usage: "iss"
};