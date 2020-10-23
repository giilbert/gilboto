const Discord = require("discord.js");
const Data = require("../../utility/data");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../../config.json")));



let command = (msg, client) => {
    let args = msg.split(" ");

    switch (args[3]) {
        case "add":
            Data.addViolation({
                
            })
            break;
    }
}

let help = (msg) => {

}

exports.register = () => {
    require("../execute").registerCommand("violation", command)
    require("../help").registerHelp("violation", help)
}