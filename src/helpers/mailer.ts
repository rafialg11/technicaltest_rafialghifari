import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const user = await User.findOne({ _id: userId });
    const username = user.username;

    await User.findOneAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 10 * 60 * 1000,
    });

    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'raffialg11@gmail.com',
      to: email,
      subject: 'Verify Your Email Address to Complete Registration',
      html: `<p style="font-family: 'Roboto', sans-serif; font-size: 14px;">
            Hello ${username},
            <br/><br/>
            Thank you for signing up with MAIA! We're thrilled to have you on board.
            <br/><br/>
            To ensure the security of your account and access all the features, please verify your email address by clicking the link below:
            <br/><br/>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}" style="font-weight: bold;">Click Here!</a>
            <br/><br/>
            If you have trouble clicking the link, please copy and paste it into your browser's address bar.
            <br/><br/>
            Once your email is verified, you'll be ready to dive into MAIA exciting features.
            <br/><br/>
            If you did not register with us, please ignore this email or contact our support team at support@maiadigital.id.
            <br/><br/>
            Thank you for choosing MAIA!
            <br/><br/>
            Best regards,
            MAIA</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
