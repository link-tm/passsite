const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const email = req.body.email;
    const message = 'ここに送信したいメッセージを記入します';

    // Gmail SMTP設定
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: '自動送信メッセージ',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('エラーが発生しました');
        } else {
            return res.status(200).send('メールが送信されました');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
