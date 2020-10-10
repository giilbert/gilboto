const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));


function setup(guild, msg) {
    guild.roles.create({
        data: {
            name: "gilboto-mute",
            color: "RED",
            permissions: ["VIEW_CHANNEL", "CONNECT", "CHANGE_NICKNAME"]
        },
        reason: "for gb mute",
    })
        .then(r => {
            muteRole = r;
            msg.reply("set up!")
        })
        .catch(e => {
            msg.reply("error setting up mute :(")
        })

}

let command = (msg, client) => {
    let muteRole = msg.guild.roles.cache.some(r => r.name === "gilboto-mute")

    if (!muteRole) setup(msg.guild, msg);

    msg.reply("end")
}

let help = (msg) => {

}

exports.register = () => {
    require("../execute").registerCommand("mute", command)
    require("../help").registerHelp("mute", help)
}