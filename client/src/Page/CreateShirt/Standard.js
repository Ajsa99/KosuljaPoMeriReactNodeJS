import React, { useContext, useState } from 'react'
import standardIMG from "./imgMere/standard.png"
import arrow from "./imgMere/arrow.png"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { createShirtContext } from '../../helpers/AuthContext';

export const Standard = () => {

    let { id } = useParams()

    const history = useNavigate();

    const [size, setSize] = useState("")

    const { material, shirt, nameMaterial, measureText, backText, tiedText, kragenText, sleeveText, sleeve10Text,
        pocketText, colorButton, colorHoles, epoleteText, umetakText, priceMaterial } = useContext(createShirtContext);

    const AllShirtDetails = {
        Material: material,
        Shirt: shirt,
        MaterialName: nameMaterial,
        Measure: measureText,
        Back: backText,
        Tied: tiedText,
        Kragen: kragenText,
        Sleeve: sleeveText,
        Sleeve1: sleeve10Text,
        Pocket: pocketText,
        ColorButton: colorButton,
        ColorHoles: colorHoles,
        Epolete: epoleteText,
        AddInsert: umetakText,
        Size: size,
        Price: priceMaterial,
    }

    const onClick = () => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.post(`http://localhost:5002/createshirt/${id}`, AllShirtDetails).then((response) => {
                alert("Uspešno ste kreirali svoju košulju!");
                history(`/basket/${id}`);
            })

        }

    }

    return (
        <div className='containerStandard'>
            <div className='standard'>
                <div className='left'>
                    <div className='round' onClick={() => { setSize("XS") }}>XS</div>
                    <div className='round' onClick={() => { setSize("S") }}>S</div>
                    <div className='round' onClick={() => { setSize("M") }}>M</div>
                    <div className='round' onClick={() => { setSize("L") }}>L</div>
                    <div className='round' onClick={() => { setSize("XL") }}>XL</div>
                    <div className='round' onClick={() => { setSize("XXL") }}>XXL</div>
                </div>
                <div className='right'>
                    <h1>STANDARDNE MERE</h1>
                    <img src={standardIMG} alt="img" />
                    {size !== "" && (
                        <div>
                            <button onClick={() => { onClick() }}>Potvrdi</button>
                            <div className='size'>{size}</div>
                        </div>
                    )
                    }

                </div>
            </div>
            <img src={arrow} alt="img" className='arrowIMG' />
        </div>
    )
}
