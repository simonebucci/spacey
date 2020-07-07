exports.run = async (client, message, args, level) => {
  const fetch = require('node-fetch');
  var link = await fetch('https://api.nasa.gov/insight_weather/?api_key=bRyKFqj5uUOLD20aSUoWgsjxmhcjGeawtvsNce6b&feedtype=json&ver=1.0').then(response => response.json());
  let lastsol = link.sol_keys[6]
  let temp = link[lastsol].AT.av
  let press = link[lastsol].PRE.av
  let wind = link[lastsol].HWS.av
  let season = link[lastsol].Season
  let mintemp = link[lastsol].AT.mn
  let maxtemp = link[lastsol].AT.mx

  const Discord = require("discord.js");
  const Canvas = require('canvas');
  const fs = require('fs')


let embed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle(`Mars Insight Weather Sol ${lastsol}`)
  .setURL('https://mars.nasa.gov/insight/')
  //.setAuthor('Insight Rover','https://mars.nasa.gov/system/content_pages/main_images/370_insight-lander-PIA22743-16x9.jpg')
  //.setDescription('Some description here')
  .setThumbnail('https://www.jpl.nasa.gov/missions/web/badge/insight.png')
  .addField('Temperature (C°)',temp , true)
  .addField('Min Temp (C°)', mintemp , true)
  .addField('Max Temp (C°)', maxtemp , true)
  .addField('Pressure (Pa)', press , true)
  .addField('Wind Horizontal Speed (m/s)', wind , true)
  .addField('Season', season , true)
  .setTimestamp()
  .setFooter("© SpaceY", client.user.avatarURL);

   message.channel.send(embed);



};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "insight",
  category: "Miscelaneous",
  description: "Get the mars weather from the Insight rover at Elysium Planitia",
  usage: "insight"
};
