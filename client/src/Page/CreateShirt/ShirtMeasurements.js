import React, { useState } from 'react'
import mereImg from "./imgMere/mere.png"
import meter from "./imgMere/meter.png"
import { BiArrowBack } from 'react-icons/bi'
import { Meter } from './Meter';
import { Standard } from './Standard';

export const ShirtMeasurements = () => {

    const [openMere, setOpenMere] = useState("");

    return (
        <div className='containerMere'>
            <p className='header'>VRSTE MERA </p>
            {openMere === "" ? (
                <>
                    <div className='bodyMere'>
                        <div className='boxMere'>
                            <p className='black'>MERE TELA</p>
                            <img src={mereImg} alt="mere" />
                            <button className='black' onClick={() => { setOpenMere("MERE TELA") }}>Izaberite mere</button>
                        </div>
                        <div className='boxMere'>
                            <p className='black'>STANDARDNE MERE</p>
                            <div className='size'>
                                <div className='round'>S</div>
                                <div className='round'>M</div>
                                <div className='round'>L</div>
                                <div className='round'>XL</div>
                            </div>
                            <button className='black' onClick={() => { setOpenMere("STANDARDNE MERE") }}>Izaberite mere</button>
                        </div>
                    </div>
                    <img src={meter} alt='metar' className='meterIMG' />

                </>
            ) : openMere === "MERE TELA" ? (
                <>
                    <div className='back' onClick={() => setOpenMere("")}><BiArrowBack className='arrow' fontSize={40} /></div>
                    <Meter />
                </>
            ) : openMere === "STANDARDNE MERE" && (
                <>
                    <div className='back' onClick={() => setOpenMere("")}><BiArrowBack className='arrow' fontSize={40} /></div>
                    <Standard />
                </>
            )}

        </div>

    )
}
