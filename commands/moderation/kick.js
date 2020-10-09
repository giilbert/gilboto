const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let command = (msg, client) => {

    if (!msg.member.hasPermission("KICK_MEMBERS")) {
        msg.reply("\nou need to have ``Kick Members`` permission to use this command")
        return;
    }
    
    let mention = msg.mentions.members.first();

    if (!mention) {
        msg.reply("\nplease mention(@) a person you want to kick")
        return;
    }

    mention.kick()
        .then(() => {
            msg.react("👍");
            console.log(`INFO | ${msg.author.tag} has kicked ${mention.user.tag}`)
        })
        .catch(() => {
            msg.react("❌")
        })
}


exports.register = () => {
    require("../execute").registerCommand("kick", command)
}