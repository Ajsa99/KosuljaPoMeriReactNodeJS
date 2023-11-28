const express = require("express");
const db = require("../../db/db")
const fs = require('fs');
const router = express.Router();

const multer = require('multer');

// Create shirt

router.post('/createshirt/:idUser', (req, res) => {

    const idUser = req.params.idUser;

    const { Material, Shirt, MaterialName, Measure, Back, Tied, Kragen, Sleeve, Sleeve1, Pocket, ColorButton, ColorHoles, Epolete, AddInsert, Size, Price } = req.body;

    const sqlInsert = "INSERT INTO create_shirt ( idUser, name, shirt, material, measure, back, tied, kragen, sleeve, sleeve1, pocket, color_button, color_holes, epolete, add_insert, size, price ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [idUser, MaterialName, Shirt, Material, Measure, Back, Tied, Kragen, Sleeve, Sleeve1, Pocket, ColorButton, ColorHoles, Epolete, AddInsert, Size, Price], (error, result) => {
        if (error) {
            console.log(error);
        }
        if (result) {
            res.send(result);
        }
    });

})

router.post('/meter/:idUser', (req, res) => {

    const idUser = req.params.idUser;

    const { idShirt, neck, breasts, waist, hips, fontSize, backSide, shoulders, sleeves, upperArm, rightWrist } = req.body;

    const sqlInsert = "INSERT INTO shirt_size ( idUser,idShirt, neck, breasts, waist, hips, fontSize, backSide, shoulders, sleeves, upperArm, rightWrist) VALUES (?,?,?,?,?,?,?,?,?,?,?,?) ";
    db.query(sqlInsert, [idUser, idShirt, neck, breasts, waist, hips, fontSize, backSide, shoulders, sleeves, upperArm, rightWrist], (error, result) => {
        if (error) {
            console.log(error);
        }
        if (result) {
            res.send(result);

        }
    });

})

// New Product


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '../client/src/Page/CreateShirt/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage: storage })

// router.post('/imageupload', upload.array('avatar', 2), async (req, res) => {
//     const images = req.files.map(file => file.originalname)

//     const { name, price } = req.body;

//     if (!name || !price || images.length < 2) {
//         return res.send({ error: 'Niste uneli sve podatke!' });
//     } else {

//         const classifiedsadd = {
//             material: images[0],
//             shirt: images[1],
//             name,
//             price
//         };

//         console.log(classifiedsadd)

//         const sql = 'INSERT INTO images (material, shirt, name, price) VALUES ?'
//         const values = [
//             [classifiedsadd.material, classifiedsadd.shirt, classifiedsadd.name, classifiedsadd.price]
//         ]
//         db.query(sql, [values], (err, results) => {
//             if (err) {
//                 console.log(err)
//                 return res.send({ error: err });
//             }
//             res.send({ success: 1 });
//         });

//     }
// });

const FormData = require('form-data');
const axios = require('axios');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/imageupload', upload.array('avatar', 2), async (req, res) => {
    try {

        const promises = req.files.map(file => {
            const formData = new FormData();
            formData.append('image', file.buffer, { filename: file.originalname });
            return axios.post('https://api.imgbb.com/1/upload?key=2eb6cdef8717cde21ad05d076cfc4150', formData, {
                headers: formData.getHeaders()
            });
        });
        const responses = await Promise.all(promises);
        const urls = responses.map(response => response.data.data.url);

        console.log(urls)

        const { name, price } = req.body;

        if (!name || !price || urls.length < 2) {
            return res.send({ error: 'Niste uneli sve podatke!' });
        } else {
            const classifiedsadd = {
                material: urls[0],
                shirt: urls[1],
                name,
                price
            };

            console.log(classifiedsadd)

            const sql = 'INSERT INTO images (material, shirt, name, price) VALUES ?'
            const values = [
                [classifiedsadd.material, classifiedsadd.shirt, classifiedsadd.name, classifiedsadd.price]
            ]
            db.query(sql, [values], (err, results) => {
                if (err) {
                    console.log(err)
                    return res.send({ error: err });
                }
                res.send({ success: 1 });
            });
        }
    } catch (error) {
        console.error(error);
        res.send({ error: 'Došlo je do greške prilikom upload-a slika.' });
    }
});


//

router.get('/getMaterial', (req, res) => {
    const sqlSelect = 'SELECT * FROM images';
    db.query(sqlSelect, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


// router.delete('/deleteMaterial/:idImage', (req, res) => {
//     const { idImage } = req.params;

//     const sqlSelect = 'SELECT material, shirt FROM images WHERE id = ?';
//     db.query(sqlSelect, idImage, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.send({ error: err });
//         }

//         const imagePath = `../client/src/Page/CreateShirt/uploads/${results[0].material}`;
//         fs.unlink(imagePath, (error) => {
//             if (error) {
//                 console.log(error);
//                 return res.send({ error });
//             }
//         });

//         const imagePath2 = `../client/src/Page/CreateShirt/uploads/${results[0].shirt}`;
//         fs.unlink(imagePath2, (error) => {
//             if (error) {
//                 console.log(error);
//                 return res.send({ error });
//             }
//         });

//         const sqlDelete = "DELETE FROM images WHERE id = ?";
//         db.query(sqlDelete, idImage, (error, result) => {
//             if (error) {
//                 console.log(error);
//                 return res.send({ error });
//             }
//             res.send({ success: 1 });
//         });
//     });
// });


router.delete('/deleteMaterial/:idImage', async (req, res) => {
    try {
        const { idImage } = req.params;
        const sqlSelect = 'SELECT material, shirt FROM images WHERE id = ?';
        db.query(sqlSelect, idImage, async (err, results) => {
            if (err) {
                console.log(err);
                return res.send({ error: err });
            }
            const materialUrl = results[0].material;
            const shirtUrl = results[0].shirt;

            // const deleteMaterialResponse = await axios.delete(`https://api.imgbb.com/1/delete?url=${materialUrl}&key=2eb6cdef8717cde21ad05d076cfc4150`);
            // if (deleteMaterialResponse.data.status_code !== 200) {
            //     console.log(deleteMaterialResponse.data);
            //     return res.send({ error: 'Došlo je do greške prilikom brisanja materijala.' });
            // }

            // const deleteShirtResponse = await axios.delete(`https://api.imgbb.com/1/delete?url=${shirtUrl}&key=2eb6cdef8717cde21ad05d076cfc4150`);
            // if (deleteShirtResponse.data.status_code !== 200) {
            //     console.log(deleteShirtResponse.data);
            //     return res.send({ error: 'Došlo je do greške prilikom brisanja košulje.' });
            // }

            const sqlDelete = "DELETE FROM images WHERE id = ?";
            db.query(sqlDelete, idImage, (error, result) => {
                if (error) {
                    console.log(error);
                    return res.send({ error });
                }
                res.send({ success: 1 });
            });
        });
    } catch (error) {
        console.error(error);
        res.send({ error: 'Došlo je do greške prilikom brisanja slika.' });
    }
});





module.exports = router;