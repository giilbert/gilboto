const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));


let command = (msg, client) => {

    let args = msg.content.split(" ");

    if (!args[2]) {
        let embed = new Discord.MessageEmbed()
            .setTitle("**gilboto help :turtle:**")
            .setColor(Config.theme.mainColor)
            .setDescription("**the prefix is: ``gb``**")
            .addField("**:tools: Utility**", `
            help, ping,\ninfo, serverinfo
            `, true)

            .addField("**:shield: Moderation**", `
            mute, kick, ban
            `, true)

            .addField("**:video_game: Fun**", `
            meme, til
            `, true)

            .addField("**:orange_square: Misc**", `
            snipe, invite
            `, true)
            
        msg.channel.send(embed)
    }
}


exports.register = () => {
    require("./execute").registerCommand("help", command)
}