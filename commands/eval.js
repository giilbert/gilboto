const Discord = require("discord.js");


let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "../config.json")));

let command = (msg, client) => {

    if (!msg.member.hasPermission('ADMINISTRATOR')) {
        msg.reply('no permission get rekt lol');
        return;
    }
    
    if (!Config.commands.allowEvalCommand) {
        msg.reply('eval command not allowed in config.json');
        return;
    }

    let embed = new Discord.MessageEmbed()
        .setTitle("**Eval**")
        .setColor(Config.theme.mainColor)

    let code = msg.content.split(' ').splice(2, msg.content.split(' ').length - 2).join(' ');
    embed.addField('**Executed**', '```js\n' + code + '```')

    let res;
    try {
        res = eval(`
        (function() {
            ${code}
            })();
        `)

    } catch (e) {
        embed.addField('**Error**', '`' + e + '`')
    }

    embed.addField('**Returns**', `\`${res}\``)

    msg.channel.send(embed);
}

let help = (msg) => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**gilboto help: eval**")
        .setColor(Config.theme.mainColor)
        .setDescription(`
        a utiity command to execute a server side Javascript code on gilboto
        `)
        .addField("**Syntax**", `
        - **eval** <javascript code>
        `)
        .addField("**Author Permissions**", "*Administrator*")
        .addField("**Bot Permissions**", `
        \`\`Administrator\`\`
        `)
}

exports.register = () => {
    require("./execute").registerCommand("eval", command)
    require("./help").registerHelp("eval", help)
}