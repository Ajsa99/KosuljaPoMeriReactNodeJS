const express = require("express");
const db = require("../../db/db")
const router = express.Router();

const mailer = require('../../Mailer/mailer');


router.get('/userInformation/:id', (req,res)=>{

    const id = req.params.id;

    const sqlGet = "SELECT * FROM users_all WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });

});

// Profile users

// User Edit

router.put("/updateUser/:id", (req, res) => {
  
    const {id} = req.params;
  
    const { ime, prezime, email, kontakt, drzava, grad, postanski_broj, adresa, type } = req.body;
  
    const sqlUpdate = "UPDATE users_all SET ime = ?, prezime = ?, kontakt = ?, drzava = ?, grad = ?, postanski_broj = ?, adresa = ? WHERE id = ? ";
    db.query(sqlUpdate, [ime, prezime, kontakt, drzava, grad, postanski_broj, adresa, id], (error, result) => {
        if(error){
            console.log(error);
        }

        if(type === 'Korisnik'){

            const sqlUpdate2 = "UPDATE users SET ime = ?, prezime = ?, kontakt = ?, drzava = ?, grad = ?, postanski_broj = ?, adresa = ? WHERE email = ?";
            db.query(sqlUpdate2, [ime, prezime, kontakt, drzava, grad, postanski_broj, adresa, email], (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
            });

        }else if(type === 'Zaposleni'){

            const sqlUpdate2 = "UPDATE users_employee SET ime = ?, prezime = ? WHERE email = ?";
            db.query(sqlUpdate2, [ime, prezime, email], (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
            });

        }else if(type === 'Admin'){

            const sqlUpdate2 = "UPDATE users_admin SET ime = ?, prezime = ? WHERE email = ?";
            db.query(sqlUpdate2, [ime, prezime, email], (error, result) => {
            if(error){
                console.log(error);
            }
            res.send(result);
            });

        } 
    });

});

// Admin

router.get('/allusers', (req,res )=> {

    const sqlGet = "SELECT * FROM users";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.get('/userInformationView/:id', (req,res)=>{

    const id = req.params.id;

    const sqlGet = "SELECT * FROM users WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });

});

router.get('/userInformationView1/:id', (req,res)=>{

    const id = req.params.id;

    const sqlGet = "SELECT * FROM users_all WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });

});

router.get('/alladmins', (req,res )=> {
    
    const sqlGet = "SELECT * FROM users_admin";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.get('/accessadmins', (req,res )=> {
    
    const sqlGet = "SELECT * FROM users_all WHERE type = 'Admin' AND access = 0";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.get('/allemployee', (req,res )=> {

    const sqlGet = "SELECT * FROM users_employee";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.get('/accessemployee', (req,res )=> {

    const sqlGet = "SELECT * FROM users_all WHERE type = 'Zaposleni' AND access = 0";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

// Access Admin

router.put('/acceptadmin/:id',(req, res)=>{

    const { id } = req.params;
    console.log(id);

    const sqlGet = "SELECT * FROM users_all WHERE id = ?";
    db.query(sqlGet, id,(error, result) => {
        
         db.query("INSERT INTO users_admin (ime, prezime, email, password, type) VALUES (?, ?, ?, ?, 'admin')",
        [result[0].ime, result[0].prezime, result[0].email, result[0].password],(err,result)=>{
            console.log(err);
        });

        db.query("UPDATE users_all SET access = 1  WHERE id = ?", id ,(err,result)=>{
            if(error){
                console.log(error);
            }
        });

        const html = `<h1>Registracija odobrena</h1>
        <p>Poštovani/na ${result[0].ime} ${result[0].prezime} postali ste Administrator na našem sajtu. Zelimo vam uspeh u budućnosti. Dobro došli :)</p>`

        mailer.sendMail(result[0].email,html);
        
    });
})

router.delete('/deleteadmin/:id', (req,res )=> {

    const { id } = req.params;
    
    const sqlDelete = "DELETE FROM users_all WHERE id = ?";
        db.query(sqlDelete, [id] , (error, result) => {
        if(error){
            console.log(error)
        }
    });
})

// Access Employee

router.put('/acceptemployee/:id',(req, res)=>{

    const { id } = req.params;

    const sqlGet = "SELECT * FROM users_all WHERE id = ?";
    db.query(sqlGet, id,(error, result) => {
        
         db.query("INSERT INTO users_employee (ime, prezime, email, password, type) VALUES (?, ?, ?, ?, 'admin')",
        [result[0].ime, result[0].prezime, result[0].email, result[0].password],(err,result)=>{
            console.log(err);
        });

        db.query("UPDATE users_all SET access = 1  WHERE id = ?", id ,(err,result)=>{
            if(error){
                console.log(error);
            }
        });

        const html = `<h1>Registracija odobrena</h1>
        <p>Poštovani/na ${result[0].ime} ${result[0].prezime} sada ste deo naše kreacije. Zelimo vam uspeh u budućnosti. Dobro došli :)</p>`

        mailer.sendMail(result[0].email,html);
        
    });
})

router.delete('/deleteemployee/:id', (req,res )=> {

    const { id } = req.params;
    console.log(id);

    const sqlDelete = "DELETE FROM users_all WHERE id = ?";
        db.query(sqlDelete, [id] , (error, result) => {
        if(error){
            console.log(error)
        }
    });
})



module.exports = router;