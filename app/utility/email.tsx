import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'your email here', // Your email address
    pass: 'you app password', // Your app password
  },
});

export const sendOrderConfirmationEmail = async (to, orderDetails) => {
  const mailOptions = {
    from: 'your email here',
    to,
    subject: 'Order Confirmation',
    text: `Thank you for your order! Here are your order details:\n\n${JSON.stringify(orderDetails, null, 2)}`,
  };

  return transporter.sendMail(mailOptions);
};
