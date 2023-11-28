import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { RiAdminFill } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { BiArrowBack } from 'react-icons/bi'
import { AllUsers } from './AllUsers';
import { AllAdmin } from './AllAdmin';
import { AllEmployee } from './AllEmployee';
import typeLogo from '../img/typeLogo.png'
import userImage from '../img/usersImage.png'
import { AccessAdmin } from './AccessAdmin';
import { AccessEmployee } from './AccessEmployee';

export const Admin = () => {

    let { id } = useParams();

    const [informationUser, setInformationUser] = useState([]);
    const [open, setOpen] = useState(0);


    useEffect(() => {

        axios.get(`http://localhost:5001/userInformation/${id}`,
        ).then((response) => {
            setInformationUser(response.data[0]);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {open === 0 ? (
                <>
                    <div className='infoType center'>
                        <div className='Top'>
                            <div className='profileIcon'>
                                <RiAdminFill size={110} />
                            </div>
                            <h3>{informationUser.type}</h3>
                            <p>{informationUser.email}</p>
                            {informationUser.ime} {informationUser.prezime}
                        </div>
                        <Link to={`/editUser/${id}`}><BiEdit className='editIcon' color='white' /></Link>
                    </div>
                    <div className='infoProfile center'>
                        <button onClick={() => { setOpen(1) }}>
                            Korisnici
                        </button>
                        <button onClick={() => { setOpen(2) }}>
                            Admini
                        </button>
                        <button onClick={() => { setOpen(3) }}>
                            Admini na čekanju
                        </button>
                        <button onClick={() => { setOpen(4) }}>
                            Zaposleni
                        </button>
                        <button onClick={() => { setOpen(5) }}>
                            Zaposleni na čekanju
                        </button>
                    </div>
                    <img src={typeLogo} alt='logo' id='profieImg' />
                </>
            ) : (open === 1) ? (
                <div className='infoProfile1 center'>
                    <div className='div1'>
                        <AllUsers />
                        <div className='back' onClick={() => { setOpen(0) }}><BiArrowBack size={15} />Nazad</div>
                    </div>
                    <div className='div2'>
                        <img src={userImage} alt='logo' />
                    </div>
                </div>
            ) : (open === 2) ? (
                <div className='infoProfile1 center'>
                    <div className='div1'>
                        <AllAdmin />
                        <div className='back' onClick={() => { setOpen(0) }}><BiArrowBack size={15} />Nazad</div>
                    </div>
                    <div className='div2'>
                        <img src={userImage} alt='logo' />
                    </div>
                </div>
            ) : (open === 3) ? (
                <div className='infoProfile1 center'>
                    <div className='div1'>
                        <AccessAdmin />
                        <div className='back' onClick={() => { setOpen(0) }}><BiArrowBack size={15} />Nazad</div>
                    </div>
                    <div className='div2'>
                        <img src={userImage} alt='logo' />
                    </div>
                </div>
            ) : (open === 4) ? (
                <div className='infoProfile1 center'>
                    <div className='div1'>
                        <AllEmployee />
                        <div className='back' onClick={() => { setOpen(0) }}><BiArrowBack size={15} />Nazad</div>
                    </div>
                    <div className='div2'>
                        <img src={userImage} alt='logo' />
                    </div>
                </div>
            ) : (open === 5) && (
                <div className='infoProfile1 center'>
                    <div className='div1'>
                        <AccessEmployee />
                        <div className='back' onClick={() => { setOpen(0) }}><BiArrowBack size={15} />Nazad</div>
                    </div>
                    <div className='div2'>
                        <img src={userImage} alt='logo' />
                    </div>
                </div>
            )}
        </>
    )
}
