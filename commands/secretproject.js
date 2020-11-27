const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
let cooldown2 = new Set();
const { promisify } = require('util')
const sleep = promisify(setTimeout)


exports.run = async(client, message, args) => {

  if(cooldown2.has(message.author.id)){
    //message.delete();
    message.reply("You have to wait 1 day to launch again!")
  }else{
  cooldown2.add(message.author.id);


  let score = client.getScore.get(message.author.id, message.guild.id);

    if(score.money >= 50000){
      score.money = score.money - 50000;
      message.channel.send(`You paid 50000$ to launch a new secret spaceship`);

      message.channel.send("Project Aurus Spaceship control System");
      await sleep(1000)
      const msg = await message.channel.send("Downloading data from secret server...");
      var i;

        await sleep(3000)
        msg.edit("System loading");
        await sleep(2000)
        msg.edit("System checklist");
        await sleep(2000)
        msg.edit("System Online");
        await sleep(2000)
        msg.edit("AI Autopilot Online");
        await sleep(2000)
        msg.edit("Defense system Online");
        await sleep(2000)
        msg.edit("Weapon loaded");
        await sleep(2000)
        msg.edit("JI-31 Fuel loaded");
        await sleep(2000)
        msg.edit("Starting the engines");
        await sleep(5000)
          //message.channel.send({files: []});
          message.channel.send("DR-17 LAUNCHED");
          message.reply(`You've earned 500000 points!`);

      countDown()
    }else{
      message.channel.send(`You don't have enough money!`);
    }

      score.points = score.points + 500000;
      client.setScore.run(score);


setTimeout(() => {
  cooldown2.delete(message.author.id)
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
  name: "secretproject",
  category: "Miscelaneous",
  description: "Launch a new secret vehicle!",
  usage: "secretproject"
};
