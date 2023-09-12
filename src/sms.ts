const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const fromNumber = process.env.FROM_NUMBER;
const send = (body: any, to: any, callback = () => {}) => {
    client.messages
        .create({
            body: body,
            from: fromNumber,
            to: to
        })
        .then((message: { sid: any; }) => {
            console.log(message.sid)
            callback()
        })
        .catch((e: any) => {
            console.error(e);
            callback();
        });
};

export default { send }