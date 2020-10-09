const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));



let command = (msg, client) => {
    if (!msg) return false;


    let embed = new Discord.MessageEmbed()
        .setTitle("**pong**")
        .setColor(Config.theme.mainColor)
        .addField(`${Date.now() - msg.createdTimestamp}ms`, "\u200b")

    msg.channel.send(embed);
}


exports.register = () => {
    require("./execute").registerCommand("ping", command)
}