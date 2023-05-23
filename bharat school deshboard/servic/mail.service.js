import nodemailer from 'nodemailer';

export const tranpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "mansihsaini77@gmail.com",
        pass: "mwzuewloizqmjqhs"
    }
});
export default tranpoter;