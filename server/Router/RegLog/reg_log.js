const express = require("express");
const db = require("../../db/db")
const router = express.Router();

const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const { validateToken } = require("../../middlevares/AuthMidleware");

const jwt = require("jsonwebtoken");

const mailer = require('../../Mailer/mailer');


//Reg-Log

router.post('/register', (req, res) => {

    const { Ime, Prezime, Email, Kontakt, Drzava, Grad, PostBroj, Adresa, Password, PPassword, type } = req.body;


    sqlGet = "SELECT email FROM users_all WHERE email = ?"

    db.query(sqlGet, Email, (error, result) => {

        if (result.length === 0) {

            const accessToken = jwt.sign({ Email }, "secret-key", { expiresIn: "1h" });

            if (Password === PPassword) {

                bcrypt.hash(Password, 10, (err, hash) => {

                    if (err) {
                        console.log(err);
                    }

                    if (type === "Korisnik") {

                        db.query("INSERT INTO users_all (ime, prezime, email, kontakt, drzava, grad, postanski_broj, adresa, password, type, access) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Korisnik', 1)",
                            [Ime, Prezime, Email, Kontakt, Drzava, Grad, PostBroj, Adresa, hash], (err, result) => {
                                if (result) {
                                    console.log(result)
                                }
                                if (err) {
                                    console.log(err);
                                }
                            });

                        db.query("INSERT INTO users (ime, prezime, email, kontakt, drzava, grad, postanski_broj, adresa, password, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Korisnik')",
                            [Ime, Prezime, Email, Kontakt, Drzava, Grad, PostBroj, Adresa, hash], (err, result) => {
                                if (result) {
                                    console.log(result)
                                }
                                if (err) {
                                    console.log(err);
                                }
                            });

                    } else if (type === "Zaposleni") {

                        db.query("INSERT INTO users_all (ime, prezime, email, password, type) VALUES (?, ?, ?, ?, 'Zaposleni' )",
                            [Ime, Prezime, Email, hash], (err, result) => {
                            });

                    } else if (type === "Admin") {

                        db.query("INSERT INTO users_all (ime, prezime, email, password, type) VALUES (?, ?, ?, ?, 'Admin')",
                            [Ime, Prezime, Email, hash], (err, result) => {
                            });

                    }
                    mailer.sendVerificationEmail(Email, accessToken);

                })
                res.send({ message: "Da biste upotpunili registraciju potrebno je da verifikujete email." });
            } else {
                res.send({ passwordErr: "Šifre se ne podudaraju" });
            }
        } else {
            res.send({ messageErr: "Postoji korisnik sa registrovanim emailom!" })
        }

    });
});

router.put("/verify/:token", (req, res) => {
    const accessToken = req.params.token;

    try {
        const decoded = jwt.verify(accessToken, "secret-key");
        const email = decoded.Email;

        const updateSql = "UPDATE users_all SET verification = 1 WHERE email = ?";
        db.query(updateSql, email, (error, result) => {
            if (error) {
                res.status(500).send({ error });
            } else {
                res.send("Uspesna verifikacija")

                sqlGet = "SELECT * FROM users_all WHERE email = ?"
                db.query(sqlGet, email, (error, result) => {

                    if (result[0].verification) {
                        if (result[0].type == 'Admin') {
                            var html = `Poštovani, ${result[0].ime} ${result[0].prezime} 
                    sa email-om: ${email} zeli pristupiti kao admin na vašem sajtu. 
                    Prijavite se na sajt i odgovorite korisniku na zahtev.`
                        } else if (result[0].type == 'Zaposleni') {
                            var html = `Poštovani, ${result[0].ime} ${result[0].prezime} 
                    sa email-om: ${email} zeli pristupiti kao zaposleni na vašem sajtu. 
                    Prijavite se na sajt i odgovorite korisniku na zahtev.`
                        }
                        else if (result[0].type == 'Korisnik') {
                            var html = `Poštovani, ${result[0].ime} ${result[0].prezime} 
                    sa email-om: ${email} je postao korisnik na vašem sajtu KosuljaPoMeri.com.`
                        }
                        mailer.sendMail("ajsa.alibasic11@gmail.com", html)
                    }
                })
            }
        });
    } catch (error) {
        res.status(400).send({ error });
    }
});


router.post('/login', (req, res) => {

    const { email, password } = req.body;

    sqlGet = "SELECT * FROM users_all WHERE email = ?";

    db.query(sqlGet, [email],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {

                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        if (result[0].verification === 0) {
                            res.send({ message: "Potrebna je verifikacija email-a!" })
                        } else {
                            if (result[0].access === 0) {
                                res.send({ message: "Registracija Admin/Zaposleni je u procesu čekanja!" })
                            } else {
                                const accessToken = sign(
                                    { email: result[0].email, id: result[0].id },
                                    "importantsecret"
                                )
                                res.send({ token: accessToken, email: email, id: result.id });
                            }
                        }
                    } else {
                        res.send({ message: "Pogrešna kombinacija email/lozinka!" });
                    }
                });
            } else {
                res.send({ message: "Korisnik ne postoji" });
            }
        });
})

router.get('/auth', validateToken, (req, res) => {
    res.send(req.user);
})

// New Password

router.post('/forgotPassword', (req, res) => {
    const { email } = req.body;

    sqlGet = "SELECT * FROM users_all WHERE email = ?";
    db.query(sqlGet, email, (err, result) => {

        if (result.length === 0) {
            res.send({ message: "Korisnik sa datim emailom ne postoji" })
        } else {

            const accessToken = jwt.sign({ email }, "secret-key", { expiresIn: "20m" });

            mailer.sendResetPasswordEmail(email, accessToken);

            res.send({ message: `Link za reset šifre je poslat na email: ${email}` });

        }
    })
});

router.post("/resetPassword/:token", (req, res) => {
    const accessToken = req.params.token;
    const { newPassword } = req.body;

    console.log(accessToken)
    console.log(newPassword)

    try {
        const decoded = jwt.verify(accessToken, "secret-key");
        const email = decoded.email;

        console.log(email)

        bcrypt.hash(newPassword, 10, (err, hash) => {
            if (err) {
                res.status(500).send({ error: "Error while hashing password" });
            } else {
                const updateSql = "UPDATE users_all SET password = ? WHERE email = ?";
                db.query(updateSql, [hash, email], (error, result) => {
                    if (error) {
                        res.status(500).send({ error });
                    } else {

                        const updateSql1 = "UPDATE users_admin SET password = ? WHERE email = ?";
                        db.query(updateSql1, [hash, email], (error, result) => {
                            if (error) {
                                res.status(500).send({ error });
                            } else {
                                res.send({ message: "Šifra je uspešno promenjena" });
                            }
                        });

                    }
                });
            }
        });

    } catch (error) {
        res.status(400).send({ error });
    }
});


module.exports = router;