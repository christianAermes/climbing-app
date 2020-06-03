// // import cryptoRandomString from "crypto-random-string"
// import crypto from "crypto"
// import nodemailer from "nodemailer"
// // import getInstalledPath from "get-installed-path"

// const generateVerificationToken = () => {
//     let token = crypto.randomBytes(48).toString("hex")
//     return token
// }

// const sendEmailTo = async (recipient) => {
//     let testAccount = await nodemailer.createTestAccount()
//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false,
//         auth: {
//             user: testAccount.user,
//             pass: testAccount.pass
//         },
//         tls:{
//             rejectUnauthorized: false
//         }
//     })

//     // transporter.verify((error, success) => {
//     //     if (error) console.log(error)
//     //     else console.log("server ready to take messages")
//     // })

//     let mailOptions = {
//         from: "no-reply <test@climbing-app.com>",
//         to: recipient,
//         subject: "Testmail",
//         text: "This is just a test. Do not reply.",
//     }

//     // let info = await transporter.sendMail(mailOptions)
//     // console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)

//     // // console.log("Message sent:", info.messageId)
//     // // console.log(info)

// }

// // let token = generateVerificationToken()
// // console.log(token)

// sendEmailTo("c.aermes@gmx.de").catch(console.error)


// export default generateVerificationToken