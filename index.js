const Discord = require("discord.js");
const colors = require("colors");
require("dotenv").config();

colors.setTheme({
    info: "white",
    warn: "yellow",
    error: "red"
})

let Config = JSON.parse(require("fs").readFileSync(require("path").join(__dirname, "config.json")));


let client = new Discord.Client();

client.on("message", (m) => {
    require("./commands/execute.js").execute(m, client);
})

client.on("ready", () => {
    console.log(`INFO | gilboto is ready with ${client.user.tag}`.info);
    client.user.setActivity(Config.presence.activity, { type: Config.presence.type });
})

client.login(process.env.token);



process.on("uncaughtException", (e) => {
    console.log(`ERROR | ${e.name}:\n${e.message}\n------------------`.error)
})