const Discord = require("discord.js");

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));

let helpCommands = [];


let command = (msg, client) => {

    let args = msg.content.split(" ");

    if (!args[2]) {
        let embed = new Discord.MessageEmbed()
            .setTitle("**gilboto help :turtle:**")
            .setColor(Config.theme.mainColor)
            .setDescription("**the prefix is: ``gb``**")
            .addField("**:tools: Utility**", `
            help, ping,\ninfo, serverinfo
            `, true)

            .addField("**:shield: Moderation**", `
            mute, unmute, kick, ban
            `, true)

            .addField("**:video_game: Fun**", `
            meme, til
            `, true)

            .addField("**:orange_square: Misc**", `
            snipe, invite, spam
            `, true)

            .setFooter("protip: use gb help [command name] to see additional info")
            
        msg.channel.send(embed)
    } else {
        if (helpCommands[args[2]]) {
            helpCommands[args[2]](msg);
        } else {
            msg.reply(`\noops! looks like \`\`${args[2]}\`\` isn't a command in the index`);
            return;
        }
    }
}


exports.register = () => {
    require("./execute").registerCommand("help", command)
}

exports.registerHelp = (name, callback) => {
    console.log(`INFO | register help command "${name}"`)
    helpCommands[name] = callback;
}

// register help for this command
exports.registerHelp("help", (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: help**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a command to see all gilboto commands and to see additional informatio about a command 
        `)
        .addField("**Syntax**", `
        - **help**\n- **help** <command name>
        `)
        .addField("**Author Permissions**", "*everyone*")
        .addField("**Bot Permissions**", `
        \`\`sendMessages\`\`,\`\`embedLinks\`\`
        `)
    
    msg.channel.send(embed)
})