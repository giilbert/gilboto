let Ping = require("./ping.js");


exports.run = (msg, client) => {
    let args = msg.content.split(" ");

    
    switch (args[1]) {
        case "ping": Ping.run(msg, client); break;

        default: msg.reply(`\nhmm it seems like \`\`${args[1]}\`\` is not a command\ntype \`\`gb help \`\` if you're lost`)
    }
}