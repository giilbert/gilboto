let commands = [];

exports.run = (msg, client) => {
  let args = msg.content.split(' ');

  if (!commands[args[1]]) {
    msg.reply(`\noops! looks like \`\`${args[1]}\`\` isn't a command`);
    return;
  }

  commands[args[1]](msg, client);
};

exports.registerCommand = function (name, callback) {
  console.log(`INFO | registered command "${name}"`.info);
  commands[name] = callback;
};
