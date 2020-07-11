exports.run = async (client, message, args, level) => {
  const fetch = require('node-fetch');
  const Math = require('mathjs');
  var link = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=bRyKFqj5uUOLD20aSUoWgsjxmhcjGeawtvsNce6b').then(response => response.json());

  function getRandomInt(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var ran = getRandomInt(0,855);

  let pic = link.photos[ran].img_src
  let rover = link.photos[ran].rover.name
  let status = link.photos[ran].rover.status
  let date = link.photos[ran].earth_date
  let camera = link.photos[ran].camera.name
  let sol = link.photos[ran].sol
  let landate = link.photos[ran].rover.landing_date
  let laudate = link.photos[ran].rover.launch_date



  const Discord = require("discord.js");
  const Canvas = require('canvas');
  const fs = require('fs')


let embed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle(`Mars Rover Photos`)
  .setURL('https://mars.nasa.gov/')
  //.setAuthor('Insight Rover','https://mars.nasa.gov/system/content_pages/main_images/370_insight-lander-PIA22743-16x9.jpg')
  //.setDescription('Some description here')
  //.setThumbnail('https://www.jpl.nasa.gov/missions/web/badge/insight.png')
  .addField('Rover Name',rover , true)
  .addField('Camera Name', camera , true)
  .addField('Earth Date', date , true)
  .addField('Sol', sol , true)
  .addField('Launch Date', laudate , true)
  .addField('Landing Date', landate , true)
  .addField('Status', status , true)
  .setImage(pic)
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
  name: "marspic",
  category: "Nasa",
  description: "Get a random Mars Rover pic",
  usage: "marspic"
};
