const Discord = require('discord.js');

let Config = require('../../config.json');

let command = (msg, client) => {
  let muteRole = msg.guild.roles.cache.find(
    (r) => r.name === Config.commands.muteRoleName
  );

  let mention = msg.mentions.members.first();

  if (!mention) {
    msg.reply('please mention someone to mute');
    return;
  }

  if (!msg.member.hasPermission('MANAGE_ROLES')) {
    msg.reply('no permssions get rekt lol');
    return;
  }

  mention.roles
    .remove(muteRole)
    .then(() => {
      msg.react('👍');
      console.log(`INFO | ${msg.author.tag} has muted ${mention.user.tag}`);
    })
    .catch((e) => {
      msg.react('❌');
      console.error(e);
    });
};

let help = (msg) => {
  let embed = new Discord.MessageEmbed()
    .setTitle('**gilboto help: unmute**')
    .setColor(Config.theme.mainColor)
    .setDescription(
      `
        literally the opposite of mute
        `
    )
    .addField(
      '**Syntax**',
      `
        - **unmute** <mention>
        `
    )
    .addField('**Author Permissions**', '``Manage Roles``')
    .addField(
      '**Bot Permissions**',
      `
        \`\`sendMessages\`\`,\`\`addReactions\`\`,\`\`manageRoles\`\`
        `
    );

  msg.channel.send(embed);
};

exports.register = () => {
  require('../execute').registerCommand('unmute', command);
  require('../help').registerHelp('unmute', help);
};
