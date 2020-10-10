exports.all = () => {
    require("./ping").register();
    require("./help").register();
    require("./invite").register();
    
    require("./moderation/kick").register();
    require("./moderation/ban").register();
    require("./moderation/mute").register();
    require("./moderation/unmute").register();
}