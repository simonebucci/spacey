const SQLite = require("better-sqlite3");
const sql = new SQLite('./agency.sqlite');
const sql2 = new SQLite('./scores.sqlite');


exports.run = (client, message, args) => {

  let agency = client.getAgency.get(message.author.id, message.guild.id);
  let text = args.join(" ");
  let score = client.getScore.get(message.author.id, message.guild.id);


  if(agency.v == 1){
    message.reply("You already have an agency!")
  }else{
    if(text == ""){
      message.channel.send("Please choose a name for your agency!");
    }else{
      if(score.money >= 500000){
        score.money = score.money - 500000;
        agency.v = 1;
        agency.aname = text;
        message.reply(`You've just founded ${text}!`);
      }
      else{
        message.channel.send(`You don't have enough money to create an agency`);
      }
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
  name: "createagency",
  category: "Space Agency",
  description: "create your space agency! (500000$)",
  usage: "createagency"
};
