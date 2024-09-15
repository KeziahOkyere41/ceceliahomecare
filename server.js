const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // To serve static files

const app = express();
app.use(bodyParser.json());

// Serve the static HTML form on the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './')); // Adjust this path to your HTML file location
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Set up Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nharnhayhaar208@gmail.com', // Your Gmail
            pass: 'diamonddiapers41', // Your Gmail password or App password if 2FA is enabled
        },
    });

    const mailOptions = {
        from: email, 
        to: 'nharnhayhaar208@gmail.com', // Email to receive the messages
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send("Error sending email.");
        }
        res.status(200).send("Email sent successfully.");
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
