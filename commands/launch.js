exports.run = async (client, message, args, level) => {

  const { promisify } = require('util')
  const sleep = promisify(setTimeout)

  var value = [0,6,9,12];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);
  if(score.points >= 1000){
    score.points = score.points - 1000;
    message.channel.send("You paid 1000$ to launch one rocket");

    const msg = await message.channel.send("Launch Countdown");
    var i;
    const countDown = async () => {
      for (i = 10; i >= 0;i--) {
        await sleep(1000)
        msg.edit(i);
      }
      await sleep(1000)
      msg.edit("Ignition");
      await sleep(1000)
      msg.edit("Lift Off");
      await sleep(5000)
      if(v !== 0) {
        message.channel.send({files: ["https://i.imgur.com/1A9thnP.jpg"]});
        message.channel.send("Successfull Launch!");
        score.level = score.level + 100;
        message.reply(`You've earned 100 points!`);
      }
      else{
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
        message.channel.send("Launch failed!");
      }
    }

    countDown()
  }else{
    message.channel.send("You don't have enough money to launch a rocket!");
  }
    client.setScore.run(score);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "launch",
  category: "Miscelaneous",
  description: "launch a rocket!",
  usage: "launch"
};
