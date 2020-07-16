exports.run = async (client, message, args, level) => {

  const { promisify } = require('util')
  const sleep = promisify(setTimeout)

  let text = args.join(" ");
  var value = [0,6,9,12,15];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);

//rocket destinations [name, price, pic, points]
  var viss = ['the ISS',1000,'https://i.imgur.com/1A9thnP.jpg',100];
  var vmoon = ['the Moon',10000,'https://www.nasa.gov/images/content/62043main_Footprint_on_moon.jpg',1000];
  var vmars = ['Mars',100000,'https://www.nasa.gov/sites/default/files/thumbnails/image/curiosityrover_buckskinpanorama_pia19808.jpg',10000];

  switch(text){
    case 'iss':
      var vet = viss;
    break;
    case 'moon':
      var vet = vmoon;
    break;
    case 'mars':
      var vet = vmars;
    break;
    default:
      message.channel.send("Please choose a destination for your rocket! (iss, moon, mars) ");
      var error = 1;
  }

if(error != 1){
  if(score.money >= vet[1]){
    score.money = score.money - vet[1];
    message.channel.send(`You paid ${vet[1]} to launch one rocket to ${vet[0]}`);

    const msg = await message.channel.send("Launch Countdown");
    var i;
    const countDown = async () => {
      for (i = 5; i >= 0;i--) {
        await sleep(1000)
        msg.edit(i);
      }
      await sleep(1000)
      msg.edit("Ignition");
      await sleep(1000)
      msg.edit("Lift Off");
      await sleep(5000)
      if(v !== 0) {
        message.channel.send({files: [vet[2]]});
        message.channel.send("Successful Launch!");
        message.reply(`You've earned ${vet[3]} points!`);
      }
      else{
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
        message.channel.send("Launch failed!");
      }
    }

    countDown()
  }else{
    message.channel.send(`You don't have enough money to launch a rocket to ${vet[0]}`);
  }
    if(v !== 0){
      score.points = score.points + vet[3];
    }
    client.setScore.run(score);
}else{
  error = 0;
}



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
  description: "launch a rocket! (iss, moon, mars)",
  usage: "launch"
};
