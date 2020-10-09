const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let command = (msg, client) => {

}


exports.register = () => {
    require("../execute").registerCommand("ban", command)
}