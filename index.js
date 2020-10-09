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

    if (!msg.guild) {
        msg.channel.send("gilboto commands are only available in servers, not in DM channels")
        return;
    }

    if (!msg.content.startsWith(Config.prefix)) return;

    CommandRunner.run(msg, client);
})

client.on("ready", () => {
    console.log(`INFO | gilboto is ready with ${client.user.tag}`.info);
    client.user.setActivity(Config.presence.activity, { type: Config.presence.type });
})

client.login(process.env.token);



process.on("uncaughtException", (e) => {
    console.log(`ERROR |\n${e.stack}\n------------------`.error);
})