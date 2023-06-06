const express = require("express");
const bodyparser = require('body-parser');
const path = require("path");

const app = express();
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 465,
    service: 'yahoo',
    secure: false,
    auth: {
        user: 'aum.kulkarni@yahoo.com',
        pass: 'clzlwfrtkjmqcnlj'
    },
    logger: true,
    debugger: false
}
);

app.use(express.static(path.join(__dirname, 'public/')))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("Here");
})

app.post('/send-email', (req, res) => {
    const mailOptions = {
        from: 'aum.kulkarni@yahoo.com', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: `Hi ${req.body.name}, Sending an email`,
        html: `<div>
        <p>Hi ${req.body.name}, <br> This is a test to see whether the email works or not<p>
        <p>There is an additional message for you: <br>
        ${req.body.additionalMessage}
        </p>
        </div>`
    };

    transporter.sendMail(
        mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(error.responseCode).send({
                    message: 'Failed to send email.'
                });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).send({
                    message: 'Email sent successfully!'
                });
            }
        });
});

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
  });
