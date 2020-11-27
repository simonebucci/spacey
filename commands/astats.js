const SQLite = require("better-sqlite3");
const sql = new SQLite('./agency.sqlite');
let cooldown = new Set();


exports.run = (client, message, args) => {

  let agency = client.getAgency.get(message.author.id, message.guild.id);
  let text = args.join(" ");


  if(agency.v == 0){
    message.reply("You don't have an agency!")
  }else{
    message.reply(`${agency.aname} agency level is ${agency.level}! Your ISS level is ${agency.iss}. Your agency launched ${agency.rockets}.`);
    }
  }



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "astats",
  category: "Miscelaneous",
  description: "check your agency stats!",
  usage: "astats"
};
