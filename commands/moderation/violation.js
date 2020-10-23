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

    let msgGen = msg.mentions.users.first().tag + "'s " + "**Violations**"
    violations.forEach(v => {
        msgGen += `
        **ID** ${v.id}
        **Moderator** ${v.moderator}
        **Time** ${new Date(v.timestamp)}
        **Reason** ${v.reason}
        `
    })

    msg.channel.send(msgGen)
}

let add = (msg) => {

    console.log(msg.mentions.users.first().id)

    Data.addViolation({
        "userid": msg.mentions.users.first().id,
        "usertag": msg.mentions.users.first().tag,
        "reason": "WORK IN PROGRESS",
        "moderator": msg.author.tag
    })

    list(msg);
}

let remove = (msg) => {

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

}

exports.register = () => {
    require("../execute").registerCommand("violation", command)
    require("../help").registerHelp("violation", help)
}