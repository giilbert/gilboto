let commands = []


exports.run = (msg, client) => {
    let args = msg.content.split(" ");

    commands[args[1]](msg, client);
}

exports.registerCommand = function (name, callback) {
    console.log(`INFO | registered command "${name}"`.info)
    commands[name] = callback;
}