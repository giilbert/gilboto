const fs = require("fs");
const path = require("path")


let violations;

let setup = () => {

    violations = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../data/violations.json"))
    )

    //addViolation({
    //    "tag": "asdad#1111",
    //    "userid": "934562",
    //    "reason": "being good",
    //    "moderator": "sald#1111"
    //})

    removeViolation({
        "userid": "1240400102",
        "id": "0"
    })
}

let save = () => {
    fs.writeFileSync(
        path.join(__dirname, "../data/violations.json"),
        JSON.stringify(violations)
    )
}


// object {
//  userid,
//  reason,
//  moderator (tag)
// }
let addViolation = (object) => {
    let userViolations = violations[object.userid];

    if (!userViolations) {
        violations[object.userid] = [];

        userViolations = violations[object.userid];
    }

    userViolations.push({
        "id": violations.currentID,
        "timestamp": Date.now(),
        "reason": object.reason,
        "moderator": object.moderator
    })

    violations.currentID++;

    save();
}


// object {
//  userid
//  id
// }
let removeViolation = (object) => {
    let userViolations = violations[object.userid];

    if (!userViolations) {
        return 0;
    }

    userViolations.forEach((v, i) => {
        if (v.id == object.id) {
            userViolations.splice(i, 1)
        }
    })

    violations.currentID--;

    save();
}

let getUserViolations = () => {
    let userViolations = violations[object.userid];

    if (!userViolations) {
        return 0;
    }

    return userViolations;
}

module.exports = { setup, removeViolation, addViolation}