const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));


let command = (msg, client) => {
    msg.channel.send("https://discord.com/oauth2/authorize?client_id=688380628277919848&scope=bot&permissions=2048")
}


exports.register = () => {
    require("./execute").registerCommand("invite", command)
}