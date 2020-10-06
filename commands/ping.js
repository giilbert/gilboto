const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));

exports.run(msg, client) = () => {

    let embed = new Discord.MessageEmbed()

    msg.channel.send(embed);

}