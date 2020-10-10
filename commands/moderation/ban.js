const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let command = (msg, client) => {

}

let help = (msg) => {

}

exports.register = () => {
    require("../execute").registerCommand("ban", command)
    require("../help").registerHelp("ban", help)
}