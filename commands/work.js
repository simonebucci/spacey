const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown = new Set();


exports.run = (client, message, args) => {

  if(cooldown.has(message.author.id)){
    //message.delete();
    message.reply("You have to wait 1 hour to work again!")
  }else{
  cooldown.add(message.author.id);

  var value = [0,100,1000,10000];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);
  score.points = score.points + v;

  if(v !== 0) {
    message.channel.send(`You gained ${v}$`);
  }else {
    message.channel.send(`Oh no! You gained ${v}$!`);
  }

  client.setScore.run(score);

  message.reply(`You currently have ${score.points}$ and are level ${score.level}!`);

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
