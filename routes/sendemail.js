const router = require("express").Router();
const nodemailer = require('nodemailer');

router.get('/sendemail', (req, res) => {
    res.json({
        status: 200,
        message: "Message Sent"
    });
})

router.post('/sendemail', (req, res) => {
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
    console.log(req.body);
    const mailOptions = {
        from: 'aum.kulkarni@yahoo.com', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: `Hi ${req.body.name}, Sending an email`,
        html: `<div>
        <p>Hi ${req.body.name}, <br> This is a test to see whether the email works or not<p>
        <p>There is an additional message for you: <br>
        ${req.body.additionalMessage ? req.body.additionalMessage : ''}
        </p>
        </div>`
    };

    transporter.sendMail(
        mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(error.responseCode).json({
                    message: 'Failed to send email.'
                });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({
                    message: 'Email sent successfully!'
                });
            }
        });
});

module.exports = router;