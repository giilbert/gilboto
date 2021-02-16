const Discord = require('discord.js');
const colors = require('colors');
require('dotenv').config();
require('./utility/data').setup();
const api = require('./utility/api');
const messages = require('./utility/messages');

colors.setTheme({
  info: 'white',
  warn: 'yellow',
  error: 'red',
});

let Config = JSON.parse(
  require('fs').readFileSync(require('path').join(__dirname, 'config.json'))
);
const CommandRunner = require('./commands/execute.js');
require('./commands/registerCommands').all();

let client = new Discord.Client();

client.on('message', (msg) => {
  try {
    if (msg.guild.id != '736233346895446026' && !msg.author.bot) {
      msg.reply(
        'gilboto commands are only available in the sall academy discord server'
      );
      return;
    }
  } catch (e) {}

  // only increment if coming from server
  if (msg.guild.id === '736233346895446026') {
    messages.addMessage(1);
  }

  if (!msg.content.toLowerCase().startsWith(Config.prefix)) return;

  if (!msg.guild && !msg.author.bot) {
    msg.channel.send(
      'gilboto commands are only available in servers, not in DM channels'
    );
    return;
  }

  CommandRunner.run(msg, client);
});

client.on('ready', () => {
  console.log(`INFO | gilboto is ready with tag ${client.user.tag}`.info);
  client.user.setActivity(Config.presence.activity, {
    type: Config.presence.type,
  });
});

client.login(process.env.token);

process.on('uncaughtException', (e) => {
  console.log(`ERROR |\n${e.stack}\n------------------`.error);
});

const express = require('express');
const app = express();

app.use(api);

app.get('/', (req, res) => {
  res.send('gilboto is ready');
});

app.listen('3000', () => {
  console.log('gilboto is listening on *3000');
});
