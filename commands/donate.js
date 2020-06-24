exports.run = async (client, message, args, level) => {

  const Discord = require("discord.js");

let embed = new Discord.RichEmbed()
  .setColor('#0099ff')
  .setTitle('Support SpaceY Bot')
  .setURL('https://paypal.me/simoneb498')
  //.setAuthor('International Space Station','https://upload.wikimedia.org/wikipedia/commons/c/cf/InternationalSpaceStationPatch.png')
  //.setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/OY6ehyS.gif')
  .addField('Donations','Do you want to buy me a coffe? Feel free to donate! (I drink a lot of coffee while coding)',true )
  .addField('PayPal: ','https://paypal.me/simoneb498', false)
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
  name: "donate",
  category: "Miscelaneous",
  description: "Do you want to buy me a coffe? Feel free to donate! (I drink a lot of coffee while coding)",
  usage: "donate"
};
