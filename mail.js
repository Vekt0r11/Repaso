const nodemailer = require("nodemailer");
const fs = require("fs");

function crear() {
    const data = new Uint8Array(Buffer.from('Holi grupo 2 work'));
    fs.writeFile('carpeta/archivo.txt', data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}
//crear();

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const contenido = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        html: "<b>Check plaintext</b>", // html body
    }

    if (fs.existsSync('./carpeta/archivo.txt')) {
        contenido.attachments = [{
            path: "./carpeta/archivo.txt"
        }]
        contenido.text = "Se adjuntó un archivo"
    } else {
        contenido.text = "No hay archivo adjunto"
    }

    // send mail with defined transport object
    let info = await transporter.sendMail(contenido);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);