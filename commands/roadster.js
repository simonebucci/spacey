
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const fetch = require('node-fetch');

  var link = await fetch('https://api.spacexdata.com/v3/roadster').then(response => response.json());
  let mission = link.name
  let description = link.details
  let date = link.launch_date_utc
  let patch = link.flickr_images
  let apo = link.apoapsis_au
  let per = link.periapsis_au
  let inclination = link.inclination
  let longitude = link.longitude
  let speed = link.speed_kph
  let earthd = link.earth_distance_km

  message.channel.send(mission);
  //message.channel.send({files: [patch]});
  message.channel.send('Launch date: '+ date);
  message.channel.send(description);
  message.channel.send('Apoapsis: '+apo);
  message.channel.send('Periapsis: '+per);
  message.channel.send('Inclination: '+inclination);
  message.channel.send('Longitude: '+longitude);
  message.channel.send('Speed: '+speed+'kph');
  message.channel.send('Earth distance: '+earthd+'Km');


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
