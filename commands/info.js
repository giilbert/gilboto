const Discord = require("discord.js");


let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));

let command = (msg, client) => {
    
    let mention = msg.mentions.members.first();

    if (!mention) {
        msg.reply("please mention a person you want to see info about");
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setTitle(mention.user.tag + " info")
        .setColor(Config.theme.mainColor)
        .setThumbnail(mention.user.displayAvatarURL())
        .addField("**Tag**", mention.user.tag)
        .addField("**Nickname**", mention.displayName)
        .addField("**Creation Date**", mention.joinedAt)
        .addField("**Id**", mention.id)
        .addField("**Permissions**", mention.permissions.toArray().join(", "))
        .addField("**Bitfield**", mention.permissions.bitfield)

    msg.channel.send(embed);
}

let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: info**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a utiity command to fetch info about a guildmember
        `)
        .addField("**Syntax**", `
        - **info** <mention>
        `)
        .addField("**Author Permissions**", "*everyone*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`
        `)
}

exports.register = () => {
    require("./execute").registerCommand("info", command)
    require("./help").registerHelp("info", help)
}