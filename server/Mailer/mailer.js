const nodemailer = require("nodemailer");

function sendMail(email, html) {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "softversko.i23m@gmail.com",
            pass: "oajwgejyjjsufotr",
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mail_option = {
        from: "softversko.i23m@gmail.com",
        to: email,
        subject: "KošuljaPoMeri",
        html: html,
    };

    transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}

function sendVerificationEmail(email, accessToken) {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "softversko.i23m@gmail.com",
            pass: "oajwgejyjjsufotr",
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mail_option = {
        from: "softversko.i23m@gmail.com",
        to: email,
        subject: "KošuljaPoMeri",
        html: `<h1>Verifikujte svoj nalog</h1>
              <p>Kliknite na <a href="https://shimmering-chebakia-0fc86f.netlify.app/verify/${accessToken}">link</a> za verifikaciju vašeg naloga.</p>`,
    };

    transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

}

function sendResetPasswordEmail(email, accessToken) {

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "softversko.i23m@gmail.com",
            pass: "oajwgejyjjsufotr",
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mail_option = {
        from: "softversko.i23m@gmail.com",
        to: email,
        subject: "KošuljaPoMeri",
        html: `<h1>Promena šifre</h1>
              <p>Kliknite <a href="https://shimmering-chebakia-0fc86f.netlify.app/newPassword/${accessToken}">ovde</a> da promenite šifru</p>`
    };

    transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

}

module.exports = {
    sendMail: sendMail,
    sendVerificationEmail: sendVerificationEmail,
    sendResetPasswordEmail: sendResetPasswordEmail,
}
