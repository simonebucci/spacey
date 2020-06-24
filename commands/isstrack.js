exports.run = async (client, message, args, level) => {
  const fetch = require('node-fetch');
  var link = await fetch('https://api.wheretheiss.at/v1/satellites/25544').then(response => response.json());
  let latitude = link.latitude
  let longitude = link.longitude
  let altitude = link.altitude
  let velocity = link.velocity

  const la = latitude
  const lo = longitude


  const Discord = require("discord.js");
  const Canvas = require('canvas');
  const fs = require('fs')


const canvas = Canvas.createCanvas(1440, 720);
ctx = canvas.getContext("2d");
const background = await Canvas.loadImage('https://i.imgur.com/RASuBZ1.jpg').catch((error) => console.log(error))
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


var myPoints = [`${lo}`, `${la}`]


var minX,minY,maxX,maxY;

     minX = -180
     minY = -90
     maxX = 180
     maxY = 90

// now get the map width and height in its local coords
const mapWidth = maxX-minX;
const mapHeight = maxY-minY;
const mapCenterX = (maxX + minX) /2;
const mapCenterY = (maxY + minY) /2;

// to find the scale that will fit the canvas get the min scale to fit height or width
const scale = Math.min(canvas.width / mapWidth,canvas.height / mapHeight);
/*
// Now you can draw the map centered on the cavas
ctx.beginPath();
myPoints.forEach(p => {
     ctx.lineTo(
         (p[0] - mapCenterX) * scale + canvas.width /2 ,
         (p[1] - mapCenterY) * scale + canvas.height / 2
     );

});
*/
ctx.beginPath();
ctx.arc(((myPoints[0] - mapCenterX) * scale) + (canvas.width /2),((-myPoints[1] - mapCenterY) * scale) + (canvas.height / 2), 40, 0, 2 * Math.PI);
ctx.fillStyle = 'red';
ctx.fill();
ctx.lineWidth = 5;
ctx.strokeStyle = '#790000';
ctx.stroke();

//const avatar = await Canvas.loadImage('https://i.imgur.com/uoTLjd0.png');
//ctx.drawImage(avatar, ((myPoints[0] - mapCenterX) * scale) + (canvas.width /2) - (avatar.width/2) ,((-myPoints[1] - mapCenterY) * scale) + (canvas.height / 2) - (avatar.height/2), 150, 150);
const logo = await Canvas.loadImage('https://i.imgur.com/3Yu8eLD.png');
ctx.drawImage(logo, 1080, 600, 250, 150);
ctx.stroke();

const attachment = new Discord.Attachment(canvas.toBuffer(), 'track.png');
const buffer = canvas.toBuffer('image/png')
fs.writeFileSync('./data/track.png', buffer)




let embed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle('ISS Live Tracking')
  .setURL('https://isstracker.spaceflight.esa.int/')
  //.setAuthor('International Space Station','https://upload.wikimedia.org/wikipedia/commons/c/cf/InternationalSpaceStationPatch.png')
  //.setDescription('Some description here')
  .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/c/cf/InternationalSpaceStationPatch.png')
  .addField('Position (Longitude, Latitude)',lo+', '+la , true)
  .addField('Altitude (Km)', altitude , true)
  .attachFile(attachment)
  .setImage('attachment://track.png')
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
  name: "isstrack",
  category: "Miscelaneous",
  description: "Track the International Space Station",
  usage: "isstrack"
};
