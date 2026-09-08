
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Bank_Transcation" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


async function sendRegistrationEmail(userEmail, name) {
  const subject = 'Welcome to Bank_Transcation!';
  const text = `Hi ${name},\n\nWelcome to Bank_Transcation! We're excited to have you on board.`;
  const html = `<p>Hi ${name},</p><p>Welcome to Bank_Transcation! We're excited to have you on board.</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(senderEmail, senderName, amount, receiverEmail, receiverName) {
  await sendEmail(
    senderEmail,
    'Transaction completed',
    `Hi ${senderName},\n\nYour transaction of ${amount} was sent to ${receiverName}.`,
    `<p>Hi ${senderName},</p><p>Your transaction of ${amount} was sent to ${receiverName}.</p>`
  );

  await sendEmail(
    receiverEmail,
    'Payment received',
    `Hi ${receiverName},\n\nYou received a transaction of ${amount} from ${senderName}.`,
    `<p>Hi ${receiverName},</p><p>You received a transaction of ${amount} from ${senderName}.</p>`
  );
}

async function sendTransactionFailureEmail(senderEmail, senderName, amount, receiverEmail, receiverName) {
    await sendEmail(
        senderEmail,
        'Transaction failed',
        `Hi ${senderName},\n\nYour transaction of ${amount} to ${receiverName} has failed.`,
        `<p>Hi ${senderName},</p><p>Your transaction of ${amount} to ${receiverName} has failed.</p>`
    );

    await sendEmail(
        receiverEmail,
        'Payment not received',
        `Hi ${receiverName},\n\nYou did not receive a transaction of ${amount} from ${senderName}.`,
        `<p>Hi ${receiverName},</p><p>You did not receive a transaction of ${amount} from ${senderName}.</p>`
    );
}

module.exports ={
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
}
