let Config = require('../config.json');

let command = (msg, client) => {
  if (!msg.member.permissions.has('MANAGE_GUILD')) {
    msg.reply('get rekt lol: you dont have permision');
    return;
  }

  let mention = msg.mentions.users.first();
  let args = msg.content.split(' ');

  let amount = args[3];

  if (amount > Config.commands.maxSpamSize) {
    msg.reply('cannot spam more than ' + Config.maxSpamSize + ' times');
    return;
  }

  args.shift();
  args.shift();
  args.shift();
  args.shift();
  let message = args.join(' ');

  for (let i = 0; i < amount; i++) {
    mention.send(`**from: ${msg.author.tag}**: ${message} <@${mention.id}>`);
  }
};

let help = (msg) => {};

exports.register = () => {
  require('./execute').registerCommand('spam', command);
  require('./help').registerHelp('spam', help);
};
