const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown3 = new Set();


exports.run = (client, message, args) => {

  if(cooldown3.has(message.author.id)){
    //message.delete();
    message.reply("You have to wait 1 day to earn again!")
  }else{
  cooldown3.add(message.author.id);


  let score = client.getScore.get(message.author.id, message.guild.id);
  score.money = score.money + 100000;

  client.setScore.run(score);

  message.channel.send(`You gained 100000$!`);
  message.reply(`You currently have ${score.money}$ and are level ${score.level}!`);

setTimeout(() => {
  cooldown3.delete(message.author.id)
}, 86400000)
}

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Premium"
};

exports.help = {
  name: "premium",
  category: "Miscelaneous",
  description: "You are a rocket man!",
  usage: "premium"
};
