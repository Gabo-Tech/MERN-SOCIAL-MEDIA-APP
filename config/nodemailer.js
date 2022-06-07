
const nodemailer = require('nodemailer')

require('dotenv').config();
const USER = process.env.USER;
const PASS = process.env.PASS;

let transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:true,
    auth:{
        user: 'testingthebridge@outlook.es',
        pass: 'Hola1234'
    }
})

module.exports = transporter