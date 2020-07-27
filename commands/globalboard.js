const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const Discord = require("discord.js");

exports.run = (client, message, args) => {

const top10 = sql.prepare("SELECT user, points FROM scores ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0xFFD700)
    .setThumbnail('https://i.imgur.com/x3cAQoF.png');


  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} points `);
  }
  return message.channel.send({embed});

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "globalboard",
  category: "Miscelaneous",
  description: "Check the global leaderboard, are you the new elon?",
  usage: "globalboard"
};
