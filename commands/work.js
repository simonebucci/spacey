const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown = new Set();


exports.run = (client, message, args) => {

  if(cooldown.has(message.author.id)){
    //message.delete();
    message.reply("You have to wait 1 hour to work again!")
  }else{
  cooldown.add(message.author.id);

  var value = [10,100,1000,10000];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);
  score.money = score.money + v;

  if(v == 10000) {
    message.channel.send(`Great job! Elon is so proud of you! You gained ${v}$`);
  }else {
    message.channel.send(`You gained ${v}$!`);
  }

  client.setScore.run(score);

  message.reply(`You currently have ${score.money}$ and are level ${score.level}!`);

setTimeout(() => {
  cooldown.delete(message.author.id)
}, 3600000)
}

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "work",
  category: "Miscelaneous",
  description: "work for elon!",
  usage: "work"
};
