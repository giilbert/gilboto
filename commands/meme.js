const Discord = require("discord.js");
const https = require("https");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));



let command = (msg, client) => {

}

let help = (msg) => {
    
}

exports.register = () => {
    require("../execute").registerCommand("meme", command)
    require("../help").registerHelp("meme", help)
}