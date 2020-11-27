const SQLite = require("better-sqlite3");
const sql = new SQLite('./agency.sqlite');


exports.run = (client, message, args) => {

  let agency = client.getAgency.get(message.author.id, message.guild.id);


  if(agency.v == 1){
    agency.v = 0;
    agency.aname = "";
    agency.level = 0;
    agency.points = 0;

    message.reply("Your agency has been deleted!")
  }else{
    message.channel.send(`You don't have an agency`);
  }
  client.setAgency.run(agency);


}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "delagency",
  category: "Miscelaneous",
  description: "delete agency (You'll lose your progress!)",
  usage: "delagency"
};
