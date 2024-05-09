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
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '0ee42bf57741d8',
        pass: 'ff6f925127dfcf',
      },
    });

    const mailOptions = {
      from: 'raffialg11@gmail.com',
      to: email,
      subject: 'Verify Your Email Address to Complete Registration',
      html: `<p style="font-family: 'Roboto', sans-serif;">
            Hello ${username},
            <br/>
            Thank you for signing up with MAIA! We're thrilled to have you on board.
            <br/>
            To ensure the security of your account and access all the features, please verify your email address by clicking the link below:
            <br/>
            <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">Click Here!</a>
            <br/>
            If you have trouble clicking the link, please copy and paste it into your browser's address bar.
            <br/>
            Once your email is verified, you'll be ready to dive into MAIA exciting features.

            If you did not register with us, please ignore this email or contact our support team at support@maiadigital.id.
            <br/>
            Thank you for choosing MAIA!
            <br/>
            Best regards,
            MAIA</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};