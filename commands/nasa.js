
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.nasa.gov/planetary/apod?api_key=bRyKFqj5uUOLD20aSUoWgsjxmhcjGeawtvsNce6b').then(response => response.json());
  let image = link.url
  let description = link.explanation
  let title = link.title
  let right = link.copyright
/*
  message.channel.send(title);
  message.channel.send({files: [image]});
  //message.channel.send(description);
  message.channel.send(right);
*/
  message.channel.send({embed: {
      color: 3447003,
      author: {
        name: "Nasa pic of the day",
        icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/717px-NASA_logo.svg.png"
      },
      image: {
      url: image
    },
      title: title,
      url: "http://nasa.gov",
      description: description,
      /*fields: [{
          name: "Author",
          value: right
        }
      ],*/
      timestamp: new Date(),
      footer: {
        icon_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/717px-NASA_logo.svg.png",
        text: "© Nasa API"
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
  name: "nasa",
  category: "Miscelaneous",
  description: "nasa image of the day",
  usage: "nasa"
};
