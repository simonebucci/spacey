

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  message.channel.send({files: ["https://i.imgur.com/YyMhfh7.jpg"]});

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "elon",
  category: "Miscelaneous",
  description: "Who doesn't love him?",
  usage: "elon"
};
