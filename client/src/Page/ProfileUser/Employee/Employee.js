import React, { useEffect, useState } from 'react'
import { OrderProcess } from './OrderProcess';
import { OrderCompleted } from './OrderCompleted';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ImUserTie } from 'react-icons/im';
import { OrderPending } from './OrderPending';
import { BiEdit } from 'react-icons/bi';
import { BiArrowBack } from 'react-icons/bi'
import basketImage from '../img/basket.png'
import './employee.css'

export const Employee = () => {


    let { id } = useParams();

    const history = useNavigate()

    const [informationUser, setInformationUser] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:5001/userInformation/${id}`,
        ).then((response) => {
            setInformationUser(response.data[0]);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='infoType center'>
                <div className='Top'>
                    <div className='profileIcon'>
                        <ImUserTie size={110} />
                    </div>
                    <h3>{informationUser.type}</h3>
                    <p>{informationUser.email}</p>
                    {informationUser.ime} {informationUser.prezime}
                </div>
                <Link to={`/editUser/${id}`}><BiEdit className='editIcon' color='white' /></Link>
            </div>
            <div className='infoProfile'>
                <h1 className='center'>Porudzbine</h1>
                <div id='button'>
                    <button onClick={() => { history(`/orderPending/${id}`) }}>
                        Porudzbine na čekanju
                    </button>
                    <button onClick={() => { history(`/orderProcess/${id}`) }}>
                        Porudzbine u procesu izrade
                    </button>
                    <button onClick={() => { history(`/orderCompleted/${id}`) }}>
                        Završene porudzbine
                    </button>
                </div>
                <img src={basketImage} className='img' alt="img" />
            </div>
        </>
    )
}
