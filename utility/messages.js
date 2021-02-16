const path = require('path');
const fs = require('fs').promises;
let data = require('../data/messages.json');

// save each 10 seconds
setInterval(() => {
  fs.writeFile(
    path.join(__dirname, '../data/messages.json'),
    JSON.stringify(data)
  )
    .then(() => {
      // console.log('data successfully saved!');
    })
    .catch((e) => {
      console.error('data failed to save', e);
    });
}, 1e4);

function getMessagesSent() {
  return data.messagesSent;
}

function addMessage(n) {
  data.totalSent += n;
}

module.exports = { getMessagesSent, addMessage };
