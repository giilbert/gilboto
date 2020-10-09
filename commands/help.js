const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));


exports.run = function(msg, args) {
    
    if (!args[2]) {
        let embed = new Discord.MessageEmbed()
            .setTitle("**gilboto help :turtle:**")
            .setColor(Config.theme.mainColor)
            .addField("**:tools: Utility**", `
            help, ping,\ninfo, serverinfo,\ninvite
            `, true)
            
            .addField("\u200b", "\u200b", true)

            .addField("**:shield: Moderation**", `
            mute, kick, ban
            `, true)

        msg.channel.send(embed)
    }
}