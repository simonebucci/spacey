exports.run = async (client, message, args, level) => {
  const Discord = require("discord.js");
  const fetch = require('node-fetch');
  let text = args.join(" ");
  var link = await fetch(`https://finnhub.io/api/v1/quote?symbol=${text}&token=bsg72tvrh5r8gpgm1gug`).then(response => response.json());
  var desc = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${text}&token=bsg72tvrh5r8gpgm1gug`).then(response => response.json());

  let price = link.c;
  let open = link.o;
  let high = link.h;
  let low = link.l;
  let close = link.pc;

  let name = desc.name;
  let logo = desc.logo;
  let url = desc.weburl;

  if(price == undefined){
    message.channel.send('Please select a valid company. http://eoddata.com/stocklist/NASDAQ/A.htm')
  }else{
    let embed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle(`${name}`)
      .setURL(`${url}`)
      .setThumbnail(`${logo}`)
      .addField('Current Price',price , true)
      .addField('Open price of the day', open, true)
      .addField('High price of the day', high , true)
      .addField('Low price of the day', low , true)
      .addField('Previous close price', close , true)
      .setTimestamp()
      .setFooter("© SpaceY", client.user.avatarURL);

       message.channel.send(embed);
  }
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "stock",
  category: "Miscelaneous",
  description: "Stock info y!stock {symbol}",
  usage: "stock"
};
