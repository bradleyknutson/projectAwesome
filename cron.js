const CronJob = require(`cron`).CronJob;
const sgMail = require(`@sendgrid/mail`);
sgMail.setApiKey(process.env.SENDGRID_API);

const emailAnimals = new CronJob(`0 0 18 * * *`, () => {
    let msg = {
        to: `test@example.com`,
        from: `test@example.com`,
        subject: `Sending with Twilio SendGrid is Fun`,
        text: `and easy to do anywhere, even with Node.js`,
        html: `<strong>and easy to do anywhere, even with Node.js</strong>`
    };
    sgMail.send(msg);
}, null, true, `America/Denver`);


module.exports = emailAnimals;