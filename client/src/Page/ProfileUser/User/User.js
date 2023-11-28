import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserTie } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi';
import { Link, useParams } from 'react-router-dom';

export const User = () => {

    let { id } = useParams();

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
                        <FaUserTie size={110} />
                    </div>
                    <h3>{informationUser.type}</h3>
                    {informationUser.ime} {informationUser.prezime}
                </div>
                <Link to={`/editUser/${id}`}><BiEdit className='editIcon' color='white' /></Link>
            </div>
            <div className='infoProfile center'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} id='tableLine'>Informacije:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th id='tableLineBottom'>Email:</th>
                            <th id='tableLineBottom'>Kontakt:</th>
                        </tr>
                        <tr>
                            <td id='tableLineTop'>{informationUser.email}</td>
                            <td id='tableLineTop'>{informationUser.kontakt}</td>
                        </tr>
                        <tr>
                            <th id='tableLineBottom'>Drzava:</th>
                            <th id='tableLineBottom'>Grad:</th>
                        </tr>
                        <tr>
                            <td id='tableLineTop'>{informationUser.drzava}</td>
                            <td id='tableLineTop'>{informationUser.grad}</td>
                        </tr>
                        <tr>
                            <th id='tableLineBottom'>Postanski broj:</th>
                            <th id='tableLineBottom'>Adresa:</th>
                        </tr>
                        <tr>
                            <td id='tableLineTop'>{informationUser.postanski_broj}</td>
                            <td id='tableLineTop'>{informationUser.adresa}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
