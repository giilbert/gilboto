const Discord = require("discord.js");
const colors = require("colors");
require("dotenv").config();

colors.setTheme({
    info: "white",
    warn: "yellow",
    error: "red"
})



let client = new Discord.Client();

client.on("message", (m) => {
    require("./commands/execute.js").execute(m, client);
})

client.on("ready", () => {
    console.log(`INFO | gilboto is ready with ${client.user.tag}`.info);
})

client.login(process.env.token);
