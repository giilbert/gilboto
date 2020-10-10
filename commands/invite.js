const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));


let command = (msg, client) => {
    msg.channel.send("https://discord.com/oauth2/authorize?client_id=688380628277919848&scope=bot&permissions=8")
}

let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: ping**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a command to get the invite link for gilboto
        `)
        .addField("**Syntax**", `
        - **invite**
        `)
        .addField("**Author Permissions**", "*everyone*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`
        `)

    msg.channel.send(embed)
}


exports.register = () => {
    require("./execute").registerCommand("invite", command)
    require("./help").registerHelp("invite", help)
}