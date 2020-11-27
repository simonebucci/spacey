const SQLite = require("better-sqlite3");
const sql = new SQLite('./agency.sqlite');


exports.run = (client, message, args) => {

  let agency = client.getAgency.get(message.author.id, message.guild.id);


  if(agency.iss == 0){
    message.reply("You don't have an iss!")
  }else{
    switch(agency.iss){
      case 1:
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
      break;
      case 2:
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
      break;
      case 3:
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
      break;
      case 4:
        message.channel.send({files: ["https://i.imgur.com/COHyS7l.jpg"]});
      break;
      default:
        message.channel.send("You don't have an iss!");
    }
  }


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "myiss",
  category: "Space Agency",
  description: "Check your iss status!",
  usage: "myiss"
};
