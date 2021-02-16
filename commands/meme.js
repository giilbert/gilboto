const Discord = require('discord.js');
const fetch = require('node-fetch');

if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

let Config = require('../config.json');

let command = (msg, client) => {
  (async () => {
    const res = await fetch(
      'https://www.reddit.com/r/meme.json?limit=50&sort=hot'
    );
    const json = await res.json();

    // Math.random() * json.data.children.length + 5
    let post =
      json.data.children[
        Math.floor(Math.random() * json.data.children.length) + 5
      ];

    let embed;
    if (!post) {
      embed = 'an error ocurred, try again';
    }

    embed = new Discord.MessageEmbed()
      .setTitle(post.data.title)
      .setColor(Config.theme.mainColor)
      .setImage(post.data.url_overridden_by_dest)
      .setURL(`https://reddit.com${post.data.permalink}`)
      .setFooter(`👍${post.data.ups} | by ${post.data.author}`);

    msg.channel.send(embed);
  })();
};

let help = (msg) => {
  let embed = new Discord.MessageEmbed()
    .setTitle('**gilboto help: meme**')
    .setColor(Config.theme.mainColor)
    .setDescription(
      `
        a entertainment command to fetch a meme from r/meme
        `
    )
    .addField(
      '**Syntax**',
      `
        - **meme**
        `
    )
    .addField('**Author Permissions**', '*everyone*')
    .addField(
      '**Bot Permissions**',
      `
        \`\`sendMessages\`\`
        `
    );
};

exports.register = () => {
  require('./execute').registerCommand('meme', command);
  require('./help').registerHelp('meme', help);
};
