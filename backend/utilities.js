const userModel = require("./models/user_object");
const bcrypt = require("bcrypt")

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

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
}

async function validatePassword(password, encrypted_correct_password) {
    const isValid = await bcrypt.compare(password, encrypted_correct_password);
    return isValid;
}

module.exports = { validateEmail, generateRandomString, generateUniqueValidToken, hashPassword, validatePassword }