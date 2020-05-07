require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer")

const router = express.Router()


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
        user: `${process.env.EMAIL_USER}`,
        pass: `${process.env.EMAIL_PASS}`
    }
})



router.post("/mailer", (req, res) => {
    const { email } = req.body

    const mailOptions = {
        from: "Some Dude <tonybherrera@gmail.com>",
        to: `${email}`,
        subject: "testing Nodemailer",
        text:
            `Hello brosive,
    
            this is looking like mailer is working. 
    
    
        Sincerely,
        
        Guy
        `
    }


    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: "Mailer Failed to send email", errors: true })
        } else {
            res.status(200).json({ message: "Email Sent" })
        }
    })
})

module.exports = router; 