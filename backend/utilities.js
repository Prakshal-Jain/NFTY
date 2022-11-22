const userModel = require("./models/user_object");

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function generateRandomString(n) {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_=!@#$%^&*()/<>[]';

    for (let i = 0; i < n; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

function generateUniqueValidToken(n = 27) {
    let randomString = generateRandomString(n)
    let isUnique = true;
    while (!isUnique) {
        userModel.find({ auth_token: randomString }, (err, user_list) => {
            if (user_list.length === 0) {
                isUnique = false;
            }
        })
    }
    return randomString;
}

module.exports = { validateEmail, generateRandomString, generateUniqueValidToken }