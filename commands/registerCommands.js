exports.all = () => {
    require("./ping").register();
    require("./help").register();
    require("./invite").register();
    
}