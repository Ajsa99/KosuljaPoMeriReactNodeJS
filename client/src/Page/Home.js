import React from 'react'
import logoTwo from "./Registration/image/shirt7.png";
import logo from "./Registration/image/shirt8.png";
import basket from './Registration/image/basket.png';
import post from "./Registration/image/post.png";
import percent from './Registration/image/percent.png';
import image1 from "./Registration/image/Image1.png";
import shirt1 from "./Registration/image/shirt1.png";
import shirt2 from "./Registration/image/shirt2.png";
import shirt3 from "./Registration/image/shirt3.png";
import shirt4 from "./Registration/image/shirt4.png";
import shirt9 from "./Registration/image/shirt9.png";
import imageNeedle from './Registration/image/imageNeedle.png';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs';

import './home.css'

function Home() {

    return (
        <div className='home'>

            <div className='shirt'>
                <p className='titleHome'>Akcija, samo vikendom</p>
                <p className='titleHome2'>20%</p>
                <img src={logo} alt="Logo" height='570' />
                <img src={logoTwo} alt="Logo" height='570' />
            </div>
            <div className='information'>
                <div className='borderBox'>
                    <div className='basket'><img src={basket} alt='basket' width='135' height='144' /></div>
                    <p>KUPOVINA NA KLIK</p>
                </div>
                <div className='borderBox'>
                    <div className='basket'><img src={post} alt='basket' width='200' height='100' /></div>
                    <p>BESPLATNA POŠTARINA</p>
                </div>
                <div className='borderBox'>
                    <div className='basket'><img src={percent} alt='basket' width='150' height='150' /></div>
                    <p>POPUST NA SVAKI TREĆI PROIZVOD</p>
                </div>
            </div>
            <div className='galery'>
                <div className='galery1'>
                    <img src={image1} alt="Logo" />
                    <div className='text'>
                        <h1>SVET KOŠULJA</h1>
                        <div className='line'></div>
                        <p>Istrazi novu kolekciju 2023 </p>
                        <BsFillArrowRightCircleFill />
                    </div>
                </div>
                <div className='galery2'>
                    <div className='img'>
                        <img src={shirt1} alt="Logo" width='60%' />
                        <p>Plava košulja</p>
                        <p className='price'>40e</p>
                    </div>
                    <div className='img'>
                        <img src={shirt2} alt="Logo" width='60%' />
                        <p>Svetlo ljubičasta košulja</p>
                        <p className='price'>30e</p>
                    </div>
                    <div className='img'>
                        <img src={shirt3} alt="Logo" width='60%' />
                        <p>Sivo-bela košulja</p>
                        <p className='price'>60e</p>
                    </div>
                    <div className='img'>
                        <img src={shirt4} alt="Logo" width='60%' />
                        <p>Bledo plava košulja</p>
                        <p className='price'>45e</p>
                    </div>
                </div>
            </div>

            <div className='createShirt'>
                <div className='left'>
                    <img src={imageNeedle} alt="Needle" width='72%' />
                    <div className='squares'>
                        <div className='square square1'></div>
                        <div className='square square2'></div>
                        <div className='square square3'></div>
                        <div className='square square4'></div>
                    </div>
                </div>

                <div className='right'>
                    <img src={shirt9} alt="Needle" width='100%' />
                    <div className='text'>
                        <h1>Kreirajte košulju po vašoj meri</h1>
                        <div className='line'></div>
                        <p>Kreiraj košulju</p>
                        <BsFillArrowLeftCircleFill id='Arrow' />
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Home