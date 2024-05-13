import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModels";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, 
        {$set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 360000,
      }});
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {$set:{
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      }});
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c53a5da22c2563",
        pass: "df18554bb456e4",
      },
    });

    const mailOptions = {
      from: "divyanshi@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">
      here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }
      /verifyemail?token=${hashedToken}</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.log(error);
  }
};
