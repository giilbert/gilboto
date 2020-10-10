const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));



let command = (msg, client) => {
    if (!msg) return false;


    let embed = new Discord.MessageEmbed()
        .setTitle("**pong**")
        .setColor(Config.theme.mainColor)
        .setDescription(`${Date.now() - msg.createdTimestamp}ms`)

    msg.channel.send(embed);
}

let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: ping**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a utility command to see ping
        `)
        .addField("**Syntax**", `
        - **ping**
        `)
        .addField("**Author Permissions**", "*everyone*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)

    msg.channel.send(embed)
}

exports.register = () => {
    require("./execute").registerCommand("ping", command);
    require("./help").registerHelp("ping", help)
}