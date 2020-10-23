exports.all = () => {
    require("./ping").register();
    require("./help").register();
    require("./invite").register();

    require("./info").register();
    //require("./serverinfo").register(); todo
    
    require("./moderation/kick").register();
    require("./moderation/ban").register();
    require("./moderation/mute").register();
    require("./moderation/unmute").register();
    require("./moderation/violation").register();

    require("./meme").register();

    require("./spam").register();
}