const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let command = (msg, client) => {
    let mention = msg.mentions.members.first();

    if (!mention) msg.reply("\nplease mention(@) a person you want to kick")

    mention.kick();
}


exports.register = () => {
    require("../execute").registerCommand("kick", command)
}