const express = require("express");
const db = require("../../db/db")
const router = express.Router();

const mailer = require('../../Mailer/mailer');


router.get('/product/:idUser', (req,res)=>{

    const idUser = req.params.idUser;

    const sqlGet = "SELECT * FROM create_shirt WHERE idUser = ?";
    db.query(sqlGet, idUser, (error, result) => {
        res.send(result);
    });

});

router.get('/countProduct/:idUser', (req,res)=>{
    const idUser = req.params.idUser;

    const sqlGet = "SELECT COUNT(id) AS count FROM create_shirt WHERE idUser = ?";
    db.query(sqlGet, idUser, (error, result) => {
        res.send(result);
    });
})


router.put('/deleteProduct/:idUser', (req,res)=>{
    const { idItem } = req.body;

    const sqlDelete = "DELETE FROM create_shirt WHERE id = ?";
    db.query(sqlDelete, idItem, (error, result) => {
        if(error){
            console.log(error)
        }
    });
})

//Basket

router.put('/orderingproducts/:id',(req, res)=>{

    const {id} = req.params;
    const {product} = req.body;
 
    console.log(product)
 
    let i = 0;
 
    while(i<product.length){
         let idSize;
        if(product[i].size === "Meter") {idSize = product[i].id} else {idSize = 0}
 
        const sqlInsert = "INSERT INTO product_user ( idUser, name, shirt, material, measure, back, tied, kragen, sleeve, sleeve1, pocket, color_button, color_holes, epolete, add_insert, size, idSize, quantity, price, delivery, status ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        db.query(sqlInsert, [ product[i].idUser, product[i].name, product[i].shirt, product[i].material, product[i].measure, product[i].back, product[i].tied, product[i].kragen, 
         product[i].sleeve, product[i].sleeve1, product[i].pocket,  product[i].color_button, product[i].color_holes, product[i].epolete, product[i].add_insert, product[i].size, idSize, product[i].count, product[i].count*product[i].price, "Pouzećem", "Na čekanju" ], (error, result) => {
            if(error){
                console.log(error);
            }
         });
         const sqlDelete = "DELETE FROM create_shirt WHERE id = ?";
         db.query(sqlDelete, [product[i].id] , (error, result) => {
         if(error){
             console.log(error)
         }
         });
        
        i++;
    }
    
    const sqlGet = "SELECT * FROM users_all WHERE id = ?";
     db.query(sqlGet, id, (error, result) => {
 
         const html =  `<h1>Obaveštenje o porudzbini</h1>
         <h3>Poštovani/na ${result[0].ime},</h3>
         <p>hvala vam što ste izabrali naš proizvod.Bićete obavešteni u roku od 24 sata o potvrdi vaše porudžbine i početku izrade.</p>
         <p>Ukoliko imate bilo kakva pitanja, slobodno nam se obratite.</p>
         <p>S poštovanjem,</p>
         <p>KošuljaPoMeri.</p>
         `     
         mailer.sendMail(result[0].email, html);
 
     });
 
 })

 // Basket History

router.get('/producthistory/:id', (req,res)=>{

    const id = req.params.id;

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE users_all.id = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });

});

router.put('/produCancel5/:id', (req,res )=> {

    const { id } = req.params;

    const sqlUpdate = "UPDATE product_user SET status = 'Otkazano5' WHERE id = ?";
    db.query(sqlUpdate, id, (error, result) => {
    });

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.id = ?";
    db.query(sqlGet, id, (error, result) => {

        const html = `<h1>Obaveštenje o odbijanju porudžbine</h1>
        <h3>Poštovani/na ${result[0].ime},</h3> 
        <p>Hvala što ste koristili našu uslugu. Žalimo što smo vas izgubili kao kupca.</p>
        <p>Otkazivanje vaše porudžbine je primljeno i procesirano. Ukoliko imate bilo kakvih pitanja u vezi sa vašom porudžbinom, molimo vas da nas kontaktirate.</p>
        <p>Hvala na razumevanju.</p>
        <p>S poštovanjem,</p>
        <p>KošuljaPoMeri</p>`

        mailer.sendMail(result[0].email, html);

    });

})

// Employee

// Order Pending

router.get('/orderPending', (req,res )=> {
    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser AND status = 'Na čekanju'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.get('/productInfo/:id', (req,res )=> {

    const { id } = req.params;

    const sqlGet = "SELECT * FROM product_user WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });
})


router.get('/meterInfo/:id', (req,res )=> {

    const { id } = req.params;

    const sqlGet = "SELECT * FROM shirt_size WHERE idShirt = ?";
    db.query(sqlGet, id, (error, result) => {
        res.send(result);
    });
})

router.put('/productProcess/:id',(req, res)=>{

    const { id } = req.params;

    const sqlUpdate = "UPDATE product_user SET status = 'Transport' WHERE id = ?";
    db.query(sqlUpdate, id, (error, result) => {
    });

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.id = ?";
    db.query(sqlGet, id, (error, result) => {
        const html = `<h1>Obaveštenje o prihvaćenoj porudžbini</h1>
        <h3>Poštovani/na ${result[0].ime},</h3>
        <p>hvala vam što ste izabrali naše usluge. Želimo da vas obavestimo da smo primili vašu porudžbinu i da se sada nalazi u procesu izrade.</p>
        <p>Bićete obavešteni kada bude gotova i spremna za isporuku. Ukoliko imate bilo kakvo pitanje, slobodno nam se obratite.</p>
        <p>S poštovanjem,</p>
        <p>KošuljaPoMeri.</p>
        `
        mailer.sendMail(result[0].email, html);
    });

})


router.put('/produCancel10/:id', (req,res )=> {

    const { id } = req.params;

    const sqlUpdate = "UPDATE product_user SET status = 'Otkazano10' WHERE id = ?";
    db.query(sqlUpdate, id, (error, result) => {
    });

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.id = ?";
    db.query(sqlGet, id, (error, result) => {

        const html = `<h1>Obaveštenje o odbijanju porudžbine</h1>
        <h3>Poštovani/na ${result[0].ime},</h3>
        <p>žao nam je što vam moramo obavestiti da vaša porudžbina nije mogla biti izvršena.</p>
        <p>Molimo vas da nas kontaktirate kako bismo pronašli zadovoljavajuće rešenje.</p>
        <p>Hvala vam na razumevanju.</p>
        <p>S poštovanjem,</p>
        <p>KošuljaPoMeri.</p>
        `
        mailer.sendMail(result[0].email, html);

    });

})

// Order Process

router.get('/orderProcess', (req,res )=> {

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser AND status = 'Transport'";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

router.put('/productAccept/:id',(req, res)=>{

    const { id } = req.params;

    const sqlUpdate = "UPDATE product_user SET status = 'Plaćeno' WHERE id = ?";
    db.query(sqlUpdate, id, (error, result) => {
    });

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.id = ?";
    db.query(sqlGet, id, (error, result) => {

        const html = `<h1>Obaveštenje o primljenoj uplati</h1>
        <h3>Poštovani/na ${result[0].ime},</h3>
        <p>želimo da vas obavestimo da smo primili vašu uplatu za porudžbinu.</p>
        <p>Hvala vam što ste koristili naše usluge. Ukoliko imate bilo kakvo pitanje vezano za vašu porudžbinu, slobodno nam se obratite.</p>
        <p>S poštovanjem,</p>
        <p>KošuljaPoMeri.</p>
        `
        mailer.sendMail(result[0].email, html);

    });

})

router.put('/productCancel50/:id', (req,res )=> {

    const { id } = req.params;

    const sqlUpdate = "UPDATE product_user SET status = 'Otkazano50' WHERE id = ?";
    db.query(sqlUpdate, id, (error, result) => {
    });

    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.id = ?";
    db.query(sqlGet, id, (error, result) => {

        const html = `<h1>Obaveštenje o otkazivanju porudžbine</h1>
        <h3>Poštovani/na ${result[0].ime},</h3>
        <p>želimo da vas obavestimo da je došlo do problema sa dostavom vaše porudžbine. Nažalost, vaša porudžbina je otkazana.</p>
        <p>Molimo vas da nas kontaktirate kako bismo pronašli zadovoljavajuće rešenje.</p>
        <p>Hvala vam na razumevanju.</p>
        <p>S poštovanjem,</p>
        <p>KošuljaPoMeri.</p>
        `
        mailer.sendMail(result[0].email, html);

    });

})

// Order Completed

router.get('/orderHistory', (req,res )=> {
    const sqlGet = "SELECT * FROM users_all INNER JOIN product_user ON users_all.id = product_user.idUser WHERE product_user.status != 'Transport' AND product_user.status != 'Na čekanju' ;";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
})

module.exports = router;