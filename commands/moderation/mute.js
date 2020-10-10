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
            msg.react("👍");
        })
        .catch(e => {
            msg.react("❌");
        })

}

let command = (msg, client) => {
    let muteRole = msg.guild.roles.cache.some(r => r.name === "gilboto-mute")

    if (!muteRole) setup(msg.guild, msg);

    muteRole = msg.guild.roles.cache.find(r => r.name === "gilboto-mute")
    console.log(muteRole)

    let mention = msg.mentions.members.first()
    mention.roles.add(muteRole)
        .then(() => {
            msg.react("👍");
            console.log(`INFO | ${msg.author.tag} has muted ${mention.user.tag}`)
        })
        .catch((e) => {
            msg.react("❌")
            console.error(e)
        })
    
    
}

let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: mute**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to mute people
        `)
        .addField("**Syntax**", `
        - **mute** <mention>
        `)
        .addField("**Author Permissions**", "``Manage Roles``")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`addReactions\`\`,\`\`manageRoles\`\`
        `)

}

exports.register = () => {
    require("../execute").registerCommand("mute", command)
    require("../help").registerHelp("mute", help)
}