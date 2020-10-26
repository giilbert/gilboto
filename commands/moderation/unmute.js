const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));




let command = (msg, client) => {
    let muteRole = msg.guild.roles.cache.find(r => r.name === Config.commands.muteRoleName)

    let mention = msg.mentions.members.first()

    if (!mention) {
        msg.reply("please mention someone to mute");
        return;
    }

    mention.roles.remove(muteRole)
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
        .setTitle("**gilboto help: unmute**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to unmute people
        `)
        .addField("**Syntax**", `
        - **unmute** <mention>
        `)
        .addField("**Author Permissions**", "``Manage Roles``")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`addReactions\`\`,\`\`manageRoles\`\`
        `)

}

exports.register = () => {
    require("../execute").registerCommand("unmute", command)
    require("../help").registerHelp("unmute", help)
}