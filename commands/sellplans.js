const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown = new Set();


exports.run = (client, message, args) => {

  if(cooldown.has(message.author.id)){
    //message.delete();
    message.reply("It's too dangerous to sell plans again, wait 1 hour and try again!")
  }else{
  cooldown.add(message.author.id);

  var value = [10000,20000,30000];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);
  score.money = score.money + v;

  if(v == 0) {
    //message.channel.send(`You got caught!`);
  }else {
    message.channel.send(`You received a little bag from a suspicious guy, you gained ${v}$`);
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
  name: "sellplans",
  category: "Miscelaneous",
  description: "Sell secret projects plans to the Russians",
  usage: "sellplans"
};
