const userModel = require("./models/user_object");
const bcrypt = require("bcrypt")

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function generateRandomString(n) {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_!@#$%^&*()/<>[]';

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

async function authenticateUser(auth_token) {
    // Get the token cookie and check if it is exist and valid. If true, return data related to the corresponding user.
    const token_list = await userModel.find({ auth_token: auth_token })
    if (token_list.length === 0) {
        return null;
    } else {
        const user = token_list[0];
        return user;
    }
}

// Filter out the owner data from item list
function filterItemList(items) {
    return items.map(item => {
        item["_id"] = undefined;
        item["__v"] = undefined;
        item["owner"] = item["owner"].email;

        if (Array.isArray(item["transaction"])) {
            item["transaction"] = item["transaction"].map((x, index) => {
                x["_id"] = undefined;
                x["__v"] = undefined;
                x["seller"] = x["seller"].email;
                x["buyer"] = x["buyer"].email;
                return x;
            });
        }
        
        if(Array.isArray(item["auction_detail"])){
            item["auction_detail"] = item["auction_detail"].map((x, index) => {
                x["_id"] = undefined;
                x["__v"] = undefined;
                x["bidder"] = x["bidder"].email;
                return x;
            });
        }
        return item;
    });
}

const parseCookie = str =>
    str.split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});

module.exports = { validateEmail, generateRandomString, generateUniqueValidToken, hashPassword, validatePassword, authenticateUser, filterItemList, parseCookie }