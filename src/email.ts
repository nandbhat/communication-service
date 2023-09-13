const mailgunApiKey = process.env.MAILGUN_API_KEY;
const mailgunFromUser = process.env.MAILGUN_FROM_USER;
const mailGunDomain = process.env.MAIL_GUN_DOMAIN;
var querystring = require('querystring');
import axios from "axios";
const send = async (title: any, body: any, user: any) => {
    // @ts-ignore
    const response = await axios({
        method: 'POST',
        url: `https://api.mailgun.net/v3/${mailGunDomain}/messages`,
        auth: {username: "api", password: mailgunApiKey},
        data: querystring.stringify({
            from: mailgunFromUser,
            to: user,
            subject: title,
            text: body
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    }).catch(function (err) {
        console.log(err);
    });
}

export default {send}