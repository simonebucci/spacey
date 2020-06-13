exports.run = async (client, message, args, level) => {
  const math = require("mathjs")
  const fetch = require('node-fetch');
  var link = await fetch('https://api.wheretheiss.at/v1/satellites/25544').then(response => response.json());
  let latitude = link.latitude
  let longitude = link.longitude
  let altitude = link.altitude
  let velocity = link.velocity

  const la = math.floor(latitude)
  const lo = math.floor(longitude)

  const Discord = require("discord.js");
  const Canvas = require('canvas');


const canvas = Canvas.createCanvas(1440, 720);
ctx = canvas.getContext("2d");
const background = await Canvas.loadImage('https://i.imgur.com/ceq47jM.jpg').catch((error) => console.log(error))
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


var myPoints = [`${lo}`, `${la}`]


var minX,minY,maxX,maxY;

     minX = -180
     minY = -90
     maxX = 180
     maxY = 90

// now get the map width and heigth in its local coords
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
const avatar = await Canvas.loadImage('https://i.imgur.com/NmgbSLp.png');
ctx.drawImage(avatar, (myPoints[0] - mapCenterX) * scale + canvas.width /2 ,(myPoints[1] - mapCenterY) * scale + canvas.height / 2, 200, 200);

ctx.stroke();

const attachment = new Discord.Attachment(canvas.toBuffer(), 'track.png');

message.channel.send(attachment);

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "track",
  category: "Miscelaneous",
  description: "Track the International Space Station",
  usage: "track"
};
