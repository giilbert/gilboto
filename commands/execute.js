let Ping = require("./ping.js");
let Help = require("./help.js");


exports.run = (msg, client) => {
    let args = msg.content.split(" ");


    switch (args[1]) {
        case "ping": Ping.run(msg); break;
        case "help": Help.run(msg, args); break;

        default: msg.reply(`\nhmm it seems like \`\`${args[1]}\`\` is not a command\ntype \`\`gb help \`\` if you're lost`)
    }
}