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

    let args = msg.content.split(" ");
    args.shift();
    args.shift();
    args.shift();

    let reason = args.join(" ");

    if (!reason) reason = "Reason unspecified";

    mention.kick(reason)
        .then(() => {
            msg.react("👍");
            console.log(`INFO | ${msg.author.tag} has kicked ${mention.user.tag}`)
        })
        .catch(() => {
            msg.react("❌")
        })
}


let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: ping**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to kick people
        `)
        .addField("**Syntax**", `
        - **kick** <mention> [reason]
        `)
        .addField("**Author Permissions**", "``Kick Members``")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`addReactions\`\`,\`\`kickMembers\`\`
        `)

    msg.channel.send(embed)
}

exports.register = () => {
    require("../execute").registerCommand("kick", command)
    require("../help").registerHelp("kick", help)
}