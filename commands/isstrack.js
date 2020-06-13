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


  const canvas = Canvas.createCanvas(720, 360);
  		// ctx (context) will be used to modify a lot of the canvas
  		const ctx = await canvas.getContext('2d');
  		// Since the image takes time to load, you should await it
  		const background = await Canvas.loadImage('https://i.imgur.com/ceq47jM.jpg').catch((error) => console.log(error))
  		// This uses the canvas dimensions to stretch the image onto the entire canvas
  		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
      //draw the isstrack
      const avatar = await Canvas.loadImage('https://i.imgur.com/NmgbSLp.png');
    	ctx.drawImage(avatar, la, lo, 100, 100);
  		// Use helpful Attachment class structure to process the file for you
  		const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

      message.channel.send(attachment);

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
