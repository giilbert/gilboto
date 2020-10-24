const Discord = require("discord.js");
const Data = require("../../utility/data");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let list = (msg) => {
    let violations = Data.getUserViolations({
        "userid": msg.mentions.users.first().id
    })

    if (!violations) {
        msg.reply("gilboto had an error")
        return
    }

    
    violations.forEach(v => {
        let embed = new Discord.MessageEmbed()
            .setTitle(msg.mentions.users.first().tag + "'s " + "**Violations** | " + "**ID** " + v.id)
            .setColor(Config.theme.mainColor)
            .addField("**Moderator**", v.moderator)
            .addField("**Time**", new Date(v.timestamp))
            .addField("**Reason**", v.reason)
        
        msg.channel.send(embed)
    })

    msg.channel.send("**Total**: " + violations.length)

}

let add = (msg) => {

    if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.reply("no permissions get rekt lol");
        return;
    }

    let args = msg.content.split(" ");

    args.splice(0, 4);

    let reason = args.join(" ")

    msg.reply("reason: " + reason)
    Data.addViolation({
        "userid": msg.mentions.users.first().id,
        "usertag": msg.mentions.users.first().tag,
        "reason": reason,
        "moderator": msg.author.tag
    })

    list(msg);
}

let remove = (msg) => {

    if (!msg.member.permissions.has("ADMINISTRATOR")) {
        msg.reply("no permissions get rekt lol");
        return;
    }

    let args = msg.content.split(" ");

    Data.removeViolation({
        "userid": msg.mentions.users.first().id,
        "id": args[4]
    })

    list(msg);
}


let command = (msg, client) => {
    let args = msg.content.split(" ");
    
    switch (args[2]) {
        case "add":
            add(msg)
            break;
        
        case "list":
            list(msg)
            break;

        case "remove":
            remove(msg)
            break;
    }
}

let help = (msg) => {
    let embedMain = new Discord.MessageEmbed()
        .setTitle("**gilboto help: violation**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to add/delete/list violations of people
        `)
        .addField("**Syntax**", `
        *See below*
        `)
        .addField("**Author Permissions**", "*see below*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)
    msg.channel.send(embedMain);

    let embedAdd = new Discord.MessageEmbed()
        .setTitle("**gilboto help: violation add**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to add violations to people
        `)
        .addField("**Syntax**", `
        - **violation** add @<member> [reason]
        `)
        .addField("**Author Permissions**", "``Administrator``")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)
    msg.channel.send(embedAdd);

    let embedRemove = new Discord.MessageEmbed()
        .setTitle("**gilboto help: violation remove**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to add violations to people
        `)
        .addField("**Syntax**", `
        - **violation** remove @<member> <id>
        `)
        .addField("**Author Permissions**", "``Administrator``")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)
    msg.channel.send(embedRemove);

    let embedList = new Discord.MessageEmbed()
        .setTitle("**gilboto help: violation list**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a moderation command to list violations of people
        `)
        .addField("**Syntax**", `
        - **violation** list @<member> 
        `)
        .addField("**Author Permissions**", "*everyone*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)
    msg.channel.send(embedList);
}

exports.register = () => {
    require("../execute").registerCommand("violation", command)
    require("../help").registerHelp("violation", help)
}