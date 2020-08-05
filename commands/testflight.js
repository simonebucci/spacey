exports.run = async (client, message, args, level) => {

  const { promisify } = require('util')
  const sleep = promisify(setTimeout)

  let text = args.join(" ");
  var value = [0,0,0,1,1];
  const randomValue = Math.floor(Math.random() * value.length);
  var v = value[randomValue];

  let score = client.getScore.get(message.author.id, message.guild.id);

  var error = 0;

//rocket destinations [name, price, pic, points]
  var vet = ['SN5',35000,'https://i.imgur.com/kmjjHHd.png',10000];
  //var vmoon = ['the Moon',10000,'https://www.nasa.gov/images/content/62043main_Footprint_on_moon.jpg',1000];
  //var vmars = ['Mars',100000,'https://www.nasa.gov/sites/default/files/thumbnails/image/curiosityrover_buckskinpanorama_pia19808.jpg',10000];
/*
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
*/
if(error != 1){
  if(score.money >= vet[1]){
    score.money = score.money - vet[1];
    message.channel.send(`You paid ${vet[1]} to launch one ${vet[0]}`);

    const msg = await message.channel.send("Launch Countdown");
    var i;
    const countDown = async () => {
      for (i = 5; i > 0;i--) {
        await sleep(1000)
        msg.edit(i);
      }
      await sleep(5000)
      if(v !== 0) {
        message.channel.send({files: [vet[2]]});
        message.channel.send("Successful Test!");
        message.reply(`You've earned ${vet[3]} points!`);
      }
      else{
        message.channel.send({files: ["https://i.imgur.com/blxA3jy.jpg"]});
        message.channel.send("Test failed!");
      }
    }

    countDown()
  }else{
    message.channel.send(`You don't have enough money to launch a ${vet[0]}`);
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
  name: "testflight",
  category: "Miscelaneous",
  description: "Test a new generation rocket! (High points reward but high failure chance) (SN5 [35000$])",
  usage: "testflight"
};
