import nodemailer from "nodemailer";

const sendEmail= async(options)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
          user: "4691cd0b7a8846",
          pass: "fc35605ec8d1da"
        }
      });

      const message={
        from:`aniltomar3@gmail.com<ERP>`,
        to:options.email,
        subject:options.subject,
        html:options.message
      };
      await transport.sendMail(message);

}

export default sendEmail;