const SQLite = require("better-sqlite3");
const sql = new SQLite('./agency.sqlite');
const sql2 = new SQLite('./scores.sqlite');


exports.run = (client, message, args) => {

  let agency = client.getAgency.get(message.author.id, message.guild.id);
  let text = args.join(" ");
  let score = client.getScore.get(message.author.id, message.guild.id);


  if(agency.v == 0){
    message.reply("You can't build an ISS without a space agency!")
  }else{
      if(score.money >= 100000){
        score.money = score.money - 100000;
        agency.score = agency.score + 30000;
        agency.iss++;
        message.reply(`You've just build the piece n° ${agency.iss} of your ISS!`);
        message.reply(`You gained 30000 points!`);
      }
      else{
        message.channel.send(`You don't have enough money to build an ISS`);
      }
  }
  client.setAgency.run(agency);
  client.setScore.run(score);

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "buildiss",
  category: "Space Agency",
  description: "Build your personal ISS",
  usage: "buildiss"
};
