// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
// Use the PORT environment variable, or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware
// Enable CORS for all routes, allowing your frontend to communicate with this backend
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// Define the /send-email endpoint to handle contact form submissions
app.post('/send-email', async (req, res) => {
    // Destructure the form data from the request body
    const { name, email, message } = req.body;

    // Basic server-side validation to ensure all required fields are present
    if (!name || !email || !message) {
        // If any field is missing, send a 400 Bad Request response
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // --- Nodemailer Transporter Configuration ---
        // Create a Nodemailer transporter using your email service details
        // These details are loaded from environment variables for security
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Example: 'gmail'. Replace with your email service (e.g., 'outlook', 'Yahoo', or a custom SMTP host)
            auth: {
                user: process.env.EMAIL_USER, // Your sending email address (from .env)
                pass: process.env.EMAIL_PASS  // Your email password or app-specific password (from .env)
            },
            // Optional: Add TLS/SSL options if your SMTP server requires them
            // tls: {
            //     rejectUnauthorized: false // Set to true in production for security, but might be needed for some local setups
            // }
        });

        // --- Email Options ---
        // Define the content of the email to be sent
        const mailOptions = {
            from: `"${name}" <${email}>`, // Sender's name and email from the contact form
            to: process.env.RECIPIENT_EMAIL, // The email address where you want to receive messages (from .env)
            subject: `New Contact Form Message from ${name}`, // Subject line for the email
            text: `You have received a new message from your website contact form.\n\n` +
                  `Name: ${name}\n` +
                  `Email: ${email}\n` +
                  `Message:\n${message}`, // Plain text body of the email
            html: `<p>You have received a new message from your website contact form.</p>` +
                  `<ul>` +
                  `<li><strong>Name:</strong> ${name}</li>` +
                  `<li><strong>Email:</strong> ${email}</li>` +
                  `</ul>` +
                  `<p><strong>Message:</strong></p>` +
                  `<p>${message.replace(/\n/g, '<br>')}</p>` // HTML body, replacing newlines with <br> for formatting
        };

        // --- Send the Email ---
        // Use the transporter to send the defined email
        await transporter.sendMail(mailOptions);

        // Log success to the server console
        console.log(`Email sent successfully from ${email} to ${process.env.RECIPIENT_EMAIL}`);
        // Send a success response back to the frontend
        res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
        // Log the error to the server console for debugging
        console.error('Error sending message:', error);
        // Send an error response back to the frontend
        res.status(500).json({ message: 'Failed to send message. Please check server logs.', error: error.message });
    }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the backend at http://localhost:${PORT}`);
    console.log('Ensure your .env file is configured with EMAIL_USER, EMAIL_PASS, and RECIPIENT_EMAIL.');
});
