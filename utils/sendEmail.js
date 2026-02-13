import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT == 465, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Emti7any" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};


export default sendEmail;
