const Discord = require("discord.js");
const colors = require("colors");
require("dotenv").config();

colors.setTheme({
    info: "white",
    warn: "yellow",
    error: "red"
});

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "config.json")));
const CommandRunner = require("./commands/execute.js");
require("./commands/registerCommands").all();

let client = new Discord.Client();


client.on("message", (msg) => {

    if (!msg.guild && !msg.author.bot) {
        msg.channel.send("gilboto commands are only available in servers, not in DM channels")
        return;
    }

    if (!msg.content.toLowerCase().startsWith(Config.prefix)) return;

    CommandRunner.run(msg, client);
})


// when bot joins a new guild
client.on("guildCreate", guild => {
    let embed = new Discord.MessageEmbed()
        .setTitle("**hello!**")
        .setColor(Config.theme.mainColor)
        .addField("**thank you for using gilboto!**", `
        the prefix for gilboto is \`\`gb\`\`
        you can invite gilboto with: https://discord.com/oauth2/authorize?client_id=688380628277919848&scope=bot&permissions=8
        btw gilboto is open sourced: https://github.com/giilbert/gilboto
        `)

    if (guild.owner) guild.owner.send(embed);
})

client.on("ready", () => {
    console.log(`INFO | gilboto is ready with tag ${client.user.tag}`.info);
    client.user.setActivity(Config.presence.activity, { type: Config.presence.type });
})



client.login(process.env.token);



process.on("uncaughtException", (e) => {
    console.log(`ERROR |\n${e.stack}\n------------------`.error);
})