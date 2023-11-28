import React, { useEffect, useState } from 'react'
import { RiArrowGoBackLine } from 'react-icons/ri'

import './createshirt.css'

import materialIcon from './images/material.png'
import modelImage from './images/modelShirt.png'
import collar from './images/collarShirt.png'
import sleeveImagee from './images/sleeveShirt.png'
import button from './images/button.png'
import dzep from './images/dzep.png'

import Strukirana from "./images/strukirana.png"
import Ravna from "./images/ravna.png"
import Proširena from "./images/prosirena.png"

import kopcanje1 from "./images/bezlajsne.png"
import kopcanje2 from "./images/salajsnom.png"
import kopcanje3 from "./images/sakriveno.png"

import ledja1 from "./images/bezfalti.png"
import ledja2 from "./images/centralnafalta.png"
import ledja3 from "./images/sadvefalte.png"

import kragna1 from './images/klasicna.png'
import kragna2 from './images/engleska.png'
import kragna3 from './images/kratka.png'
import kragna4 from './images/italijanska.png'
import kragna5 from './images/francuska.png'
import kragna6 from './images/oxford.png'
import kragna7 from './images/ultrakosa.png'
import kragna8 from './images/tuxedo.png'
import kragna9 from './images/ruska.png'

import sleeve1 from './images/trapezasta1.png'
import sleeve2 from './images/trapezasta2.png'
import sleeve3 from './images/obla.png'
import sleeve4 from './images/obla2.png'
import sleeve5 from './images/francuskitrapez.png'
import sleeve6 from './images/francuskikvadrat.png'
import sleeve7 from './images/koktel.png'
import sleeve8 from './images/kockasta1.png'
import sleeve9 from './images/kockasta2.png'

import sleeve11 from './images/dugrukav.png'
import sleeve12 from './images/kratakrukav.png'

import pocket1 from './images/pravougaoni.png'
import pocket2 from './images/obli.png'
import pocket3 from './images/trapezast.png'
import pocket4 from './images/spicasti.png'

import button1 from './images/dugme.png'
import button2 from './images/rupice.png'
import button3 from './images/epolete1.png'
import button4 from './images/epolete2.png'
import button5 from './images/umetak.png'
import button6 from './images/bezumetka.png'
import button7 from './images/saumetkom.png'

import { ShirtMeasurements } from './ShirtMeasurements'

import { createShirtContext } from '../../helpers/AuthContext';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { RiDeleteBin6Line } from 'react-icons/ri';

const CreateShirt = () => {

    let { id } = useParams();

    const history = useNavigate()

    const [openMaterial, setOpenMaterial] = useState(false);
    const [material, setMaterial] = useState("");
    const [nameMaterial, setNameMaterial] = useState("");
    const [shirt, setShirt] = useState("")
    const [priceMaterial, setPriceMaterial] = useState(0);

    const [openModel, setOpenModel] = useState(false);
    const [measureText, setmeasureText] = useState("");
    const [measureImage, setMeasurImage] = useState();

    const [backText, setbackText] = useState("");
    const [backImage, setBackImage] = useState();

    const [tiedText, setTiedText] = useState("");
    const [tiedImage, setTiedImage] = useState();

    const [openKragen, setOpenKragen] = useState(false);
    const [kragenText, setKragenText] = useState("");
    const [kragenImage, setKragenImage] = useState();

    const [openSleeve, setOpenSleeve] = useState(false);
    const [sleeveText, setSleeveText] = useState("");
    const [sleeveImage, setSleeveImage] = useState();

    const [openPocket, setOpenPocket] = useState(false);
    const [pocketText, setPocketText] = useState("");
    const [pocketImage, setPocketImage] = useState();

    const [openOther, setOpenOther] = useState(false);

    const [colorButton, setColorButton] = useState("");

    const [colorHoles, setColorHoles] = useState("");

    const [sleeve10Text, setSleeve10Text] = useState("");
    const [sleeve10Image, setSleeve10Image] = useState();

    const [epoleteText, setEpoleteText] = useState("");
    const [epoleteImage, setEpoleteImage] = useState("")

    const [umetakText, setUmetakText] = useState("")
    const [umetakImage, setUmetakImage] = useState();


    const [images, setImages] = useState([])
    const [typeUser, setTypeUser] = useState([])

    useEffect(() => {

        axios.get("http://localhost:5002/getMaterial").then((response) => {
            if (response) {
                setImages(response.data);
            }
        })

        axios.get(`http://localhost:5001/userInformation/${id}`).then((response) => {
            if (response) {
                setTypeUser(response.data[0].type)
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const DeleteMaterial = (idImage) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.delete(`http://localhost:5002/deleteMaterial/${idImage}`).then((response) => { })

            alert('Uspešno ste obrisali Materijal!');
            const newImagesList = images.filter(image => image.id !== idImage);
            setImages(newImagesList);

        }

    }


    return (
        <createShirtContext.Provider value={{ material, shirt, nameMaterial, measureText, backText, tiedText, kragenText, sleeveText, sleeve10Text, pocketText, colorButton, colorHoles, epoleteText, umetakText, priceMaterial }}>
            <div className='containerCreateShirt'>
                <div className='containerShirt'>

                    {/* left */}
                    <div className='left'>

                        {openMaterial === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenMaterial(false) }} /></button>
                                <p className='header'>IZBOR MATERIJALA</p>
                            </div>

                        ) : openModel === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenModel(false) }} /></button>
                                <p className='header'>IZBOR MODELA</p>
                            </div>
                        ) : openKragen === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenKragen(false) }} /></button>
                                <p className='header'>IZBOR KRAGNE</p>
                            </div>
                        ) : openSleeve === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenSleeve(false) }} /></button>
                                <p className='header'>IZBOR RUKAVA</p>
                            </div>
                        ) : openPocket === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenPocket(false) }} /></button>
                                <p className='header'>IZBOR DZEPA</p>
                            </div>
                        ) : openOther === true ? (
                            <div className='headerLeft'>
                                <button><RiArrowGoBackLine size={30} onClick={() => { setOpenOther(false) }} /></button>
                                <p className='header'>OSTALI DETALJI</p>
                            </div>
                        ) : (
                            <div className='headerLeft'>
                                <p className='header'>NAPRAVITE SVOJU KOŠULJU </p>
                            </div>
                        )

                        }


                        <div className='containerBox'>

                            {/* Izabeite materijal */}


                            {openMaterial ? (
                                <div className='materialBox'>
                                    <div>
                                        {typeUser != 'Korisnik' && <div onClick={() => history(`/newProduct/${id}`)} className='center gray cursorPointer'>Dodaj+</div>}
                                    </div>
                                    <div className='box1'>
                                        {images.map((image, index) => (
                                            <div key={index} className={nameMaterial === `${image.name}` ? 'background-gray' : ''}>
                                                <img src={image.material} onClick={() => { setShirt(`${image.shirt}`); setMaterial(`${image.material}`); setNameMaterial(`${image.name}`); setPriceMaterial(`${image.price}`); }} alt="materijal" width="100%" />
                                                <p>{image.name}</p>
                                                <p>Cena: {image.price}e</p>

                                                {typeUser != 'Korisnik' && <p className='cursorPointer' onClick={() => DeleteMaterial(image.id)}><RiDeleteBin6Line /></p>}

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : openModel ? (

                                // izaberite Model

                                <div className='materialBox'>

                                    <p>Kroj</p>
                                    <div className='modelShirt'>
                                        <div className={measureText === "Strukirana" && `background-gray`}>
                                            <img src={Strukirana} alt='osnova' className='img' width='100%' onClick={() => { setmeasureText("Strukirana"); setMeasurImage(Strukirana) }} />
                                            <p>Strukirana</p>
                                        </div>
                                        <div className={measureText === "Ravna" && `background-gray`}>
                                            <img src={Ravna} alt='osnova' className='img' width='100%' onClick={() => { setmeasureText("Ravna"); setMeasurImage(Ravna) }} />
                                            <p>Ravna</p>
                                        </div>
                                        <div className={measureText === "Proširena" && `background-gray`}>
                                            <img src={Proširena} alt='osnova' className='img' width='100%' onClick={() => { setmeasureText("Proširena"); setMeasurImage(Proširena) }} />
                                            <p>Proširena</p>
                                        </div>
                                    </div>


                                    <p>Ledja</p>
                                    <div className='modelShirt'>
                                        <div className={backText === "Bez falti" && `background-gray`}>
                                            <img src={ledja1} alt='ledja' className='img' width='100%' onClick={() => { setbackText("Bez falti"); setBackImage(ledja1) }} />
                                            <p>Bez falti</p>
                                        </div>
                                        <div className={backText === "Centralna falta" && `background-gray`}>
                                            <img src={ledja2} alt='ledja' className='img' width='100%' onClick={() => { setbackText("Centralna falta"); setBackImage(ledja2) }} />
                                            <p>Centralna falta</p>
                                        </div>
                                        <div className={backText === "Sa dve falte" && `background-gray`}>
                                            <img src={ledja3} alt='ledja' className='img' width='100%' onClick={() => { setbackText("Sa dve falte"); setBackImage(ledja3) }} />
                                            <p>Sa dve falte</p>
                                        </div>
                                    </div>

                                    <p>Kopčanje</p>
                                    <div className='modelShirt'>
                                        <div className={tiedText === "Bez lajsne" && `background-gray`}>
                                            <img src={kopcanje1} alt='kopčanje' className='img' width='100%' onClick={() => { setTiedText("Bez lajsne"); setTiedImage(kopcanje1) }} />
                                            <p>Bez lajsne</p>
                                        </div>
                                        <div className={tiedText === "Sa lajsnom" && `background-gray`}>
                                            <img src={kopcanje2} alt='kopčanje' className='img' width='100%' onClick={() => { setTiedText("Sa lajsnom"); setTiedImage(kopcanje2) }} />
                                            <p>Sa lajsnom</p>
                                        </div>
                                        <div className={tiedText === "Sakriveno" && `background-gray`}>
                                            <img src={kopcanje3} alt='kopčanje' className='img' width='100%' onClick={() => { setTiedText("Sakriveno"); setTiedImage(kopcanje3) }} />
                                            <p>Sakriveno</p>
                                        </div>
                                    </div>

                                </div>
                            ) : openKragen ? (

                                // izaberite kragnu

                                <div className='materialBox'>
                                    <div className='kragenBox'>
                                        <div className={kragenText === "Klasična" && `background-gray`}>
                                            <img src={kragna1} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Klasična"); setKragenImage(kragna1) }} />
                                            <p>Klasična</p>
                                        </div>
                                        <div className={kragenText === "Engleska" && `background-gray`}>
                                            <img src={kragna2} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Engleska"); setKragenImage(kragna2) }} />
                                            <p>Engleska</p>
                                        </div>
                                        <div className={kragenText === "Kratka" && `background-gray`}>
                                            <img src={kragna3} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Kratka"); setKragenImage(kragna3) }} />
                                            <p>Kratka</p>
                                        </div>
                                        <div className={kragenText === "Italijanska" && `background-gray`}>
                                            <img src={kragna4} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Italijanska"); setKragenImage(kragna4) }} />
                                            <p>Italijanska</p>
                                        </div>
                                        <div className={kragenText === "Francuska" && `background-gray`}>
                                            <img src={kragna5} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Francuska"); setKragenImage(kragna5) }} />
                                            <p>Francuska</p>
                                        </div>
                                        <div className={kragenText === "Oxford" && `background-gray`}>
                                            <img src={kragna6} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Oxford"); setKragenImage(kragna6) }} />
                                            <p>Oxford</p>
                                        </div>
                                        <div className={kragenText === "Ultra kosa" && `background-gray`}>
                                            <img src={kragna7} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Ultra kosa"); setKragenImage(kragna7) }} />
                                            <p>Ultra kosa</p>
                                        </div>
                                        <div className={kragenText === "Tuxedo" && `background-gray`}>
                                            <img src={kragna8} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Tuxedo"); setKragenImage(kragna8) }} />
                                            <p>Tuxedo</p>
                                        </div>
                                        <div className={kragenText === "Ruska" && `background-gray`}>
                                            <img src={kragna9} alt='kragna' className='img' width='100%' onClick={() => { setKragenText("Ruska"); setKragenImage(kragna9) }} />
                                            <p>Ruska</p>
                                        </div>
                                    </div>
                                </div>
                            ) : openSleeve ? (

                                // izaberite rukav

                                <div className='materialBox'>
                                    <div className='kragenBox'>
                                        <div className={sleeveText === "Trapezasta sa jednim dugmetom" && `background-gray`}>
                                            <img src={sleeve1} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Trapezasta sa jednim dugmetom"); setSleeveImage(sleeve1) }} />
                                            <p>Trapezasta sa jednim dugmetom</p>
                                        </div>
                                        <div className={sleeveText === "Trapezasta sa dva dugmeta" && `background-gray`}>
                                            <img src={sleeve2} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Trapezasta sa dva dugmeta"); setSleeveImage(sleeve2) }} />
                                            <p>Trapezasta sa dva dugmeta</p>
                                        </div>
                                        <div className={sleeveText === "Obla sa jednim dugmetom" && `background-gray`}>
                                            <img src={sleeve3} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Obla sa jednim dugmetom"); setSleeveImage(sleeve3) }} />
                                            <p>Obla sa jednim dugmetom</p>
                                        </div>
                                        <div className={sleeveText === "Obla sa dva dugmeta" && `background-gray`}>
                                            <img src={sleeve4} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Obla sa dva dugmeta"); setSleeveImage(sleeve4) }} />
                                            <p>Obla sa dva dugmeta</p>
                                        </div>
                                        <div className={sleeveText === "Francuski trapez" && `background-gray`}>
                                            <img src={sleeve5} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Francuski trapez"); setSleeveImage(sleeve5) }} />
                                            <p>Francuski trapez</p>
                                        </div>
                                        <div className={sleeveText === "Francuski kvadrat" && `background-gray`}>
                                            <img src={sleeve6} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Francuski kvadrat"); setSleeveImage(sleeve6) }} />
                                            <p>Francuski kvadrat</p>
                                        </div>
                                        <div className={sleeveText === "Koktel" && `background-gray`}>
                                            <img src={sleeve7} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Koktel"); setSleeveImage(sleeve7) }} />
                                            <p>Koktel</p>
                                        </div>
                                        <div className={sleeveText === "Kockasta sa jednim dugmetom" && `background-gray`}>
                                            <img src={sleeve8} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Kockasta sa jednim dugmetom"); setSleeveImage(sleeve8) }} />
                                            <p>Kockasta sa jednim dugmetom</p>
                                        </div>
                                        <div className={sleeveText === "Kockasta sa dva dugmeta" && `background-gray`}>
                                            <img src={sleeve9} alt='sleeve' className='img' width='100%' onClick={() => { setSleeveText("Kockasta sa dva dugmeta"); setSleeveImage(sleeve9) }} />
                                            <p>Kockasta sa dva dugmeta</p>
                                        </div>

                                        {/* dug-kratak rukav */}
                                        <div className={sleeve10Text === "Dug rukav" && `background-gray`}>
                                            <img src={sleeve11} alt='sleeve' className='img' width='100%' onClick={() => { setSleeve10Text("Dug rukav"); setSleeve10Image(sleeve11) }} />
                                            <p>Dug rukav</p>
                                        </div>
                                        <div className={sleeve10Text === "Kratak rukav" && `background-gray`}>
                                            <img src={sleeve12} alt='sleeve' className='img' width='100%' onClick={() => { setSleeve10Text("Kratak rukav"); setSleeve10Image(sleeve12) }} />
                                            <p>Kratak rukav</p>
                                        </div>
                                    </div>

                                </div>
                            ) : openPocket ? (

                                // Izaberite dzep

                                <div className='materialBox'>
                                    <div className='kragenBox'>
                                        <div className={pocketText === "Pravougaoni" && `background-gray`} >
                                            <img src={pocket1} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Pravougaoni"); setPocketImage(pocket1) }} />
                                            <p>PRAVOUGAONI</p>
                                        </div>
                                        <div className={pocketText === "Dva pravougaona" && `background-gray`} >
                                            <img src={pocket1} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Dva pravougaona"); setPocketImage(pocket1) }} />
                                            <p>DVA PRAVOUGAONI</p>
                                        </div>
                                        <div className={pocketText === "Obli" && `background-gray`}>
                                            <img src={pocket2} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Obli"); setPocketImage(pocket2) }} />
                                            <p>OBLI</p>
                                        </div>
                                        <div className={pocketText === "Dva obla" && `background-gray`}>
                                            <img src={pocket2} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Dva obla"); setPocketImage(pocket2) }} />
                                            <p>DVA OBLA</p>
                                        </div>
                                        <div className={pocketText === "Trapezast" && `background-gray`}>
                                            <img src={pocket3} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Trapezast"); setPocketImage(pocket3) }} />
                                            <p>TRAPEZAST</p>
                                        </div>
                                        <div className={pocketText === "Dva trapezasta" && `background-gray`}>
                                            <img src={pocket3} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Dva trapezasta"); setPocketImage(pocket3) }} />
                                            <p>DVA TRAPEZASTA</p>
                                        </div>
                                        <div className={pocketText === "Trapezasti sa poklopcima" && `background-gray`}>
                                            <img src={pocket3} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Trapezasti sa poklopcima"); setPocketImage(pocket3) }} />
                                            <p>TRAPEZASTI SA POKLOPCIMA</p>
                                        </div>
                                        <div className={pocketText === "Spicasti" && `background-gray`} >
                                            <img src={pocket4} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Spicasti"); setPocketImage(pocket4) }} />
                                            <p>ŠPICASTI</p>
                                        </div>
                                        <div className={pocketText === "Dva spicasta" && `background-gray`} >
                                            <img src={pocket4} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Dva spicasta"); setPocketImage(pocket4) }} />
                                            <p>DVA ŠPICASTA</p>
                                        </div>
                                        <div className={pocketText === "Spicasti sa poklopcem" && `background-gray`} >
                                            <img src={pocket4} alt='sleeve' className='img' width='100%' onClick={() => { setPocketText("Spicasti sa poklopcem"); setPocketImage(pocket4) }} />
                                            <p>ŠPICASTI SA POKLOPCIMA</p>
                                        </div>
                                    </div>

                                </div>
                            ) : openOther ? (

                                // Ostali detalji

                                <div className='materialBox'>
                                    <p>Dugmad</p>
                                    <div className='modelShirt'>
                                        <div>
                                            <img src={button1} alt='sleeve' className='img' width='100%' />
                                            <div className={colorButton}>{colorButton}</div>
                                        </div>
                                        <div className='colorButton'>
                                            <div className='colorBox black' onClick={() => { setColorButton("black") }}></div>
                                            <div className='colorBox gray' onClick={() => { setColorButton("gray") }}></div>
                                            <div className='colorBox white' onClick={() => { setColorButton("white") }}></div>
                                            <div className='colorBox green' onClick={() => { setColorButton("green") }}></div>
                                            <div className='colorBox blue' onClick={() => { setColorButton("blue") }}></div>
                                            <div className='colorBox cornflowerblue' onClick={() => { setColorButton("cornflowerblue") }}></div>
                                            <div className='colorBox mediumpurple' onClick={() => { setColorButton("mediumpurple") }}></div>
                                            <div className='colorBox orange' onClick={() => { setColorButton("orange") }}></div>
                                            <div className='colorBox pink' onClick={() => { setColorButton("pink") }}></div>
                                            <div className='colorBox baby' onClick={() => { setColorButton("baby") }}></div>
                                            <div className='colorBox violet' onClick={() => { setColorButton("violet") }}></div>
                                            <div className='colorBox yellow' onClick={() => { setColorButton("yellow") }}></div>
                                            <div className='colorBox gold' onClick={() => { setColorButton("gold") }}></div>
                                            <div className='colorBox brown' onClick={() => { setColorButton("brown") }}></div>
                                            <div className='colorBox lightOrange' onClick={() => { setColorButton("lightOrange") }}></div>
                                            <div className='colorBox red' onClick={() => { setColorButton("red") }}></div>
                                        </div>
                                    </div>
                                    <p>Rupice</p>
                                    <div className='modelShirt'>
                                        <div>
                                            <img src={button2} alt='sleeve' className='img' width='100%' />
                                            <div className={colorHoles}>{colorHoles}</div>
                                        </div>
                                        <div className='colorButton'>
                                            <div className='colorBox black' onClick={() => { setColorHoles("black") }}></div>
                                            <div className='colorBox gray' onClick={() => { setColorHoles("gray") }}></div>
                                            <div className='colorBox white' onClick={() => { setColorHoles("white") }}></div>
                                            <div className='colorBox green' onClick={() => { setColorHoles("green") }}></div>
                                            <div className='colorBox blue' onClick={() => { setColorHoles("blue") }}></div>
                                            <div className='colorBox cornflowerblue' onClick={() => { setColorHoles("cornflowerblue") }}></div>
                                            <div className='colorBox mediumpurple' onClick={() => { setColorHoles("mediumpurple") }}></div>
                                            <div className='colorBox orange' onClick={() => { setColorHoles("orange") }}></div>
                                            <div className='colorBox pink' onClick={() => { setColorHoles("pink") }}></div>
                                            <div className='colorBox baby' onClick={() => { setColorHoles("baby") }}></div>
                                            <div className='colorBox violet' onClick={() => { setColorHoles("violet") }}></div>
                                            <div className='colorBox yellow' onClick={() => { setColorHoles("yellow") }}></div>
                                            <div className='colorBox gold' onClick={() => { setColorHoles("gold") }}></div>
                                            <div className='colorBox brown' onClick={() => { setColorHoles("brown") }}></div>
                                            <div className='colorBox lightOrange' onClick={() => { setColorHoles("lightOrange") }}></div>
                                            <div className='colorBox red' onClick={() => { setColorHoles("red") }}></div>
                                        </div>
                                    </div>

                                    <p>Epolete</p>
                                    <div className='modelShirt'>
                                        <div onClick={() => { setEpoleteText("Standardne epolete"); setEpoleteImage(button3) }} className={epoleteText === "Standardne epolete" && `background-gray`}>
                                            <img src={button3} alt='sleeve' className='img' width='100%' />
                                            <p>Standardne epolete</p>
                                        </div>
                                        <div onClick={() => { setEpoleteText("Bez epoleta"); setEpoleteImage(button4) }} className={epoleteText === "Bez epoleta" && `background-gray`}>
                                            <img src={button4} alt='sleeve' className='img' width='100%' />
                                            <p>Bez epoleta</p>
                                        </div>
                                    </div>

                                    <p>Umetak</p>
                                    <div className='modelShirt'>
                                        <div>
                                            <img src={button5} alt='sleeve' className='img' width='100%' />
                                        </div>
                                        <div onClick={() => { setUmetakText("Bez umetka"); setUmetakImage(button6) }} className={umetakText === "Bez umetka" && `background-gray`}>
                                            <img src={button6} alt='sleeve' className='img' width='100%' />
                                            <p>Bez umetka</p>
                                        </div>
                                        <div onClick={() => { setUmetakText("Sa umetkom"); setUmetakImage(button7) }} className={umetakText === "Sa umetkom" && `background-gray`}>
                                            <img src={button7} alt='sleeve' className='img' width='100%' />
                                            <p>Sa umetkom</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (


                                <>
                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Izbor materijala</p>
                                            <div className='img'><img src={materialIcon} alt="model" width={'100%'} />

                                            </div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenMaterial(!openMaterial)
                                            setOpenModel(false)
                                            setOpenKragen(false);
                                            setOpenSleeve(false);
                                            setOpenPocket(false);
                                            setOpenOther(false);
                                        }}>Izaberite materijal</p>
                                    </div>

                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Izbor modela</p>
                                            <div className='img'><img src={modelImage} alt="model" width={'85%'} /></div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenModel(!openModel)
                                            setOpenMaterial(false)
                                            setOpenKragen(false);
                                            setOpenSleeve(false);
                                            setOpenPocket(false);
                                            setOpenOther(false);
                                        }}>Izaberite model</p>
                                    </div>
                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Izbor kragne</p>
                                            <div className='img'><img src={collar} alt="model" width={'90%'} /></div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenKragen(!openKragen)
                                            setOpenMaterial(false)
                                            setOpenModel(false)
                                            setOpenSleeve(false);
                                            setOpenPocket(false);
                                            setOpenOther(false);
                                        }}>Izaberite kragnu</p>
                                    </div>
                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Izbor rukava</p>
                                            <div className='img'><img src={sleeveImagee} alt="model" width={'90%'} /></div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenSleeve(!openSleeve)
                                            setOpenMaterial(false)
                                            setOpenModel(false)
                                            setOpenKragen(false);
                                            setOpenPocket(false);
                                            setOpenOther(false);
                                        }}>Izaberite rukav</p>
                                    </div>
                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Izbor dzepa</p>
                                            <div className='img'><img src={dzep} alt="model" width={'75%'} /></div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenPocket(!openPocket)
                                            setOpenMaterial(false)
                                            setOpenModel(false)
                                            setOpenKragen(false);
                                            setOpenSleeve(false);
                                            setOpenOther(false);
                                        }}>Izaberite dzep</p>
                                    </div>
                                    <div className='box'>
                                        <div className='boxTOP'>
                                            <p>Ostali detalji</p>
                                            <div className='img'><img src={button} alt="model" width={'90%'} /></div>
                                        </div>
                                        <p className='p' onClick={() => {
                                            setOpenOther(!openOther)
                                            setOpenMaterial(false)
                                            setOpenModel(false)
                                            setOpenKragen(false);
                                            setOpenSleeve(false);
                                            setOpenPocket(false);
                                        }}>Ostali detalji</p>
                                    </div>

                                </>
                            )}
                        </div>
                    </div>

                    {/* right */}

                    <div className='right'>
                        <p className='p'>kupiš 3 košulje i dobiješ popust</p>
                        <div className='containerBox'>
                            <div className='containerElement'>
                                <div className='imgBigShirt'>
                                    {shirt !== "" && (<><img src={shirt} alt="kroj" width='100%' /><h2>{nameMaterial}: {priceMaterial}e</h2></>)}</div>
                                <div className='containerRight'>
                                    {pocketText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={pocketImage} alt="model" width='100%' /></div>
                                            <p>{pocketText}</p>
                                        </div>
                                    )}
                                    {epoleteText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={epoleteImage} alt="kroj" width='100%' /></div>
                                            <p>{epoleteText}</p>
                                        </div>
                                    )}
                                    {umetakText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={umetakImage} alt="model" width='100%' /></div>
                                            <p>{umetakText}</p>
                                        </div>
                                    )}
                                    {colorButton !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={button1} alt="model" width='100%' /></div>
                                            <p className={colorButton}>{colorButton}</p>
                                        </div>
                                    )}
                                    {colorHoles !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={button2} alt="model" width='100%' /></div>
                                            <p className={colorHoles}>{colorHoles}</p>
                                        </div>
                                    )}
                                </div>
                                <div className='containerRight'>
                                    {measureText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={measureImage} alt="kroj" width='100%' /></div>
                                            <p>{measureText}</p>
                                        </div>
                                    )}
                                    {backText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={backImage} alt="kroj" width='100%' /></div>
                                            <p>{backText}</p>
                                        </div>
                                    )}
                                    {tiedText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={tiedImage} alt="kroj" width='100%' /></div>
                                            <p>{tiedText}</p>
                                        </div>
                                    )}
                                    {kragenText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={kragenImage} alt="model" width='100%' /></div>
                                            <p>{kragenText}</p>
                                        </div>
                                    )}
                                    {sleeveText !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={sleeveImage} alt="model" width='100%' /></div>
                                            <p>{sleeveText}</p>
                                        </div>
                                    )}
                                    {sleeve10Text !== "" && (
                                        <div className='boxRight border'>
                                            <div className='img'><img src={sleeve10Image} alt="model" width='100%' /></div>
                                            <p>{sleeve10Text}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {(measureText !== "" && backText !== "" && tiedText !== "" && kragenText !== "" && sleeveText !== "" && sleeve10Text !== "" &&
                    pocketText !== "" && epoleteText !== "" && umetakText !== "" && colorButton !== "" && colorHoles !== "") && (
                        <ShirtMeasurements />
                    )}

            </div>
        </createShirtContext.Provider>
    )
}

export default CreateShirt