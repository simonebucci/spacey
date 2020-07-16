const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const Discord = require("discord.js");

exports.run = (client, message, args) => {

// Limited to guild owner - adjust to your own preference!
  //if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");

  const user = message.mentions.users.first() || client.users.get(args[0]);
  const sender = message.author.id;
  if(!user) return message.reply("You must mention someone or give their ID!");

  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't tell me how many dollars to give...")
  if(pointsToAdd < 0) return message.reply("You can't give this amount...")
  if(user == sender) return message.reply("You can't give yourself money...")

  // Get their current points.
  let userscore = client.getScore.get(user.id, message.guild.id);
  let senderscore = client.getScore.get(message.author.id, message.guild.id);
  // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
  if (!userscore) {
    userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1, money: 0 }
  }
  if (!senderscore) {
    senderscore = { id: `${message.guild.id}-${sender.id}`, user: sender.id, guild: message.guild.id, points: 0, level: 1, money: 0 }
  }
  if(senderscore.money < pointsToAdd) return message.reply("You don't have enough money")
  userscore.money += pointsToAdd;
  senderscore.money -= pointsToAdd;


  // And we save it!
  client.setScore.run(userscore);
  client.setScore.run(senderscore);

  return message.channel.send(`${user.tag} has received ${pointsToAdd}$ and now has ${userscore.money}$.`);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "give",
  category: "Miscelaneous",
  description: "Give dollars to someone",
  usage: "give"
};
