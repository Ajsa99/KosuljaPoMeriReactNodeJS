const express = require("express");
const db = require("../../db/db")
const router = express.Router();
const nodemailer = require("nodemailer");

const cors = require("cors");
router.use(cors());

router.post('/messageSend/:id',(req, res)=>{

    const id = req.params.id;
    const {message} = req.body;

    const sqlGet = "SELECT * FROM users_all WHERE id = ? ;";
    db.query(sqlGet, id,(error, result) => {
        if(result){

            var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "softversko.i23m@gmail.com",
                    pass: "oajwgejyjjsufotr", 
                },
                tls: {
                    rejectUnauthorized: false
                }
            })

            const mail_option = {
                from: "softversko.i23m@gmail.com",
                to: "softversko.i23m@gmail.com",
                subject: `KošuljaPoMeri: ${result[0].email}`,
                html: `<h1>Korisnik: ${result[0].ime} ${result[0].prezime}</h1>
                <p>${message}</p>`,
            };
        
            transporter.sendMail(mail_option, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });

            res.send({resmessage:"Poruka je poslata!"})   
        }
    });
})

module.exports = router;