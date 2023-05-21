import nodemailer from "nodemailer";

export const sendEmail = async (email: string, token: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "faraz.ahmed7397@gmail.com",
                pass: "irazqeywdzvfqmzq",
            },
        });
        const mailOptions = {
            from: "faraz.ahmed7397@gmail.com",
            to: email,
            subject: 'Password Reset',
            text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
        };

        await transporter.sendMail(mailOptions);

        console.log("email sent sucessfully");
        return true;
    } catch (error) {
        console.log(error, "email not sent");
        return false;
    }
};


