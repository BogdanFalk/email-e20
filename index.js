const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3213;
const cors = require('cors');


app.use(cors())

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files (for HTML templates, etc.)
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter
    let transporter = nodemailer.createTransport({
        host: 'mail.e20.ro', // Replace with your SMTP server address
        port: 465, // Replace with your SMTP port (usually 587 or 465)
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'alexandra@e20.ro', // Replace with your SMTP user
            pass: 'grungefall197'    // Replace with your SMTP password
        },
        debug: true, // show debug output
        logger: true // log information in console
    });

    // Define the email options
    let mailOptions = {
        from: 'contact@e20.ro', // Sender address
        to: 'gombotcuprune@gmail.com', // List of recipients
        subject: 'Contact Form Message',
        html: `<p>You have a new contact form submission</p>
               <h3>Contact Details</h3>
               <ul>
                  <li>Name: ${name}</li>
                  <li>Email: ${email}</li>
               </ul>
               <h3>Message</h3>
               <p>${message}</p>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
