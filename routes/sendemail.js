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
        to: 'aum.kulkarni@yahoo.com', // Replace with the recipient's email address
        subject: req.body.subject,
        html: `<div>
        <p>${req.body.additionalMessage}</p>
        </div>`
    };

    transporter.sendMail(
        mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

    const newMailOptions = {
        from: 'aum.kulkarni@yahoo.com', // Replace with your email address
        to: req.body.email, // Replace with the recipient's email address
        subject: `Hi ${req.body.name}, Thank you for contacting`,
        html: `<div>
        <p>Hi ${req.body.name}, <br> Thank you for contacting us<p>
        <p>Here are the details you have entered: <br>
        Name: ${req.body.name} <br>
        Email: ${req.body.email} <br>
        Message: ${req.body.additionalMessage ? req.body.additionalMessage : ''}
        </p>
        </div>`
    };
    transporter.sendMail(
        newMailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(error.responseCode).json({
                    message: 'Failed to send email.',
                    detail: error.response
                });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({
                    message: 'Email Sent successfully',
                    detail: 'Thank you for filling the form'
                })
            }
        });


});

module.exports = router;