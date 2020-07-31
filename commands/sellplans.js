const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown = new Set();
const { promisify } = require('util')
const sleep = promisify(setTimeout)


exports.run = async (client, message, args) => {

  if(cooldown.has(message.author.id)){
    //message.delete();
    message.reply("It's too dangerous to sell plans again, wait 1 hour and try again!")
  }else{
  cooldown.add(message.author.id);

  var value = [0,-10000,-25000,10000,20000,30000];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);
  if(score.money<=v && v<0)
  {
    score.money = 0;
  }else{
    score.money = score.money + v;
  }


  switch(v){
    case 0:
      msg = await message.channel.send(`Something went wrong...`);
      await sleep(2000)
      msg.edit(`You got caught but luckily you managed to escape`);
    break;
    case -10000:
      msg = await message.channel.send(`Something went wrong...`);
      await sleep(2000)
      msg.edit(`You got caught! You paid 10000$ to be released`);
    break;
    case -25000:
      msg = await message.channel.send(`Something went wrong...`);
      await sleep(2000)
      msg.edit(`You got caught! You paid 25000$ to be released`);
    break;
    default:
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
  description: "Sell secret projects plans to the Russians, be careful you might get caught!",
  usage: "sellplans"
};
