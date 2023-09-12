import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'your_email_service_provider', // e.g., 'Gmail'
    auth: {
        user: 'nandan@gmail.com',
        pass: 'your_email_password', // Use an 'App Password' or application-specific password
    },
});
