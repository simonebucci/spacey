exports.run = async (client, message, args, level) => {

  const { promisify } = require('util')
  const sleep = promisify(setTimeout)

  var value = [0,6,9,12];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

    const msg = await message.channel.send("Launch Countdown");
    const list = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    var int = 10;
    const countDown = async () => {
      for (const item of list) {
        await sleep(1000)
        msg.edit(int);
        int = int - 1;
      }
      await sleep(1000)
      msg.edit("Ignition");
      await sleep(1000)
      msg.edit("Lift Off");
      await sleep(5000)
      if(v !== 0) {
        message.channel.send({files: ["https://i.imgur.com/1A9thnP.jpg"]});
        message.channel.send("Successfull Launch!");
      }
      else{
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
        message.channel.send("Launch failed!");
      }
    }

    countDown()


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
