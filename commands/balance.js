const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

exports.run = (client, message, args) => {
  let score = client.getScore.get(message.author.id, message.guild.id);
  message.reply(`You currently have ${score.money} $ and are level ${score.level}!`);
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "balance",
  category: "Miscelaneous",
  description: "Check your wallet and your level",
  usage: "balance"
};
