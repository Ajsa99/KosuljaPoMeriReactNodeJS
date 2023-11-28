import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'

export const ViewUser1 = () => {

    let { id, idUser } = useParams();

    const [informationUser, setInformationUser] = useState([]);

    useEffect(() => {

        axios.get(`http://localhost:5001/userInformationView1/${idUser}`)
            .then((res) => { setInformationUser(res.data[0]) });
    }, []);

    return (
        <div className='containerProfile'>
            <div className='editUser viewUser center'>
                <Link to={`/profileUser/${id}`}><button className='Back'><IoIosArrowBack />Nazad</button></Link>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2} id='tableLine'>Informacije:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th id='tableLineBottom'>Ime:</th>
                            <th id='tableLineBottom'>Prezime:</th>
                        </tr>
                        <tr>
                            <td id='tableLineTop'>{informationUser.ime}</td>
                            <td id='tableLineTop'>{informationUser.prezime}</td>
                        </tr>
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
        </div>
    )
}
