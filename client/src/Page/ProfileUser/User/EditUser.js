import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'

const initialValues = {
    ime: "",
    prezime: "",
    email: "",
    kontakt: "",
    drzava: "",
    grad: "",
    postanski_broj: "",
    adresa: "",
    type: "",
}

export const EditUser = () => {

    let { id } = useParams();

    const history = useNavigate();

    const [informationUser, setInformationUser] = useState([initialValues]);

    const { ime, prezime, email, kontakt, drzava, grad, postanski_broj, adresa, type } = informationUser;


    useEffect(() => {

        axios.get(`http://localhost:5001/userInformation/${id}`)
            .then((res) => { setInformationUser(res.data[0]) });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!ime || !prezime || !kontakt || !drzava || !grad || !postanski_broj || !adresa) {
            alert("Unesite vrednost u svako polje za unos")

        } else {

            const userConfirmation = window.confirm("Da li ste sigurni?");

            if (userConfirmation === true) {

                axios.put(`http://localhost:5001/updateUser/${id}`, {
                    ime,
                    prezime,
                    email,
                    kontakt,
                    drzava,
                    grad,
                    postanski_broj,
                    adresa,
                    type
                }).then(() => {
                    setInformationUser({ ime: "", prezime: "", kontakt: "", drzava: "", grad: "", postanski_broj: "", adresa: "", type: "" })
                }).catch((err) => console.log(err.response.data));

                history(`/profileUser/${id}`);
            }

        }
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();
        if (!ime || !prezime) {
            alert("Unesite vrednost u svako polje za unos")
        } else {

            const userConfirmation = window.confirm("Da li ste sigurni?");

            if (userConfirmation === true) {

                axios.put(`http://localhost:5001/updateUser/${id}`, {
                    ime,
                    prezime,
                    email,
                    kontakt,
                    drzava,
                    grad,
                    postanski_broj,
                    adresa,
                    type
                }).then(() => {
                    setInformationUser({ ime: "", prezime: "" })
                }).catch((err) => console.log(err.response.data));

                history(`/profileUser/${id}`);
            }

        }

    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInformationUser({ ...informationUser, [name]: value });
    }

    return (
        <div className='containerProfile'>
            <div className='editUser'>
                <div className='header'>
                    <h1>Izmeni informacije:</h1>
                    <Link to={`/profileUser/${id}`}><button className='back'><IoIosArrowBack />Nazad</button></Link>
                </div>
                {informationUser.type === "Korisnik" ? (
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <th id='tableLineBottom'>Ime:</th>
                                    <th id='tableLineBottom'>Prezime:</th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'><input type="text" name="ime" value={ime || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z]{3,}+" required /></td>
                                    <td id='tableLineTop'><input type="text" name="prezime" value={prezime || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z]{3,}+" required /></td>
                                </tr>
                                <tr>
                                    <th id='tableLineBottom'>Email:</th>
                                    <th id='tableLineBottom'>Kontakt:</th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'>{informationUser.email}</td>
                                    <td id='tableLineTop'><input type="text" name="kontakt" value={kontakt || ""} onChange={handleInputChange} pattern='\d{10,13}' required /></td>
                                </tr>
                                <tr>
                                    <th id='tableLineBottom'>Drzava:</th>
                                    <th id='tableLineBottom'>Grad:</th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'><input type="text" name="drzava" value={drzava || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z\s]+" required /></td>
                                    <td id='tableLineTop'><input type="text" name="grad" value={grad || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z\s]+" required /></td>
                                </tr>
                                <tr>
                                    <th id='tableLineBottom'>Postanski broj:</th>
                                    <th id='tableLineBottom'>Adresa:</th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'><input type="text" name="postanski_broj" value={postanski_broj || ""} onChange={handleInputChange} pattern='\d{4,7}' required /></td>
                                    <td id='tableLineTop'><input type="text" name="adresa" value={adresa || ""} onChange={handleInputChange} pattern='[A-Z][a-zA-Z\s]+\s?[a-zA-Z\s]+\s?[a-zA-Z\d]{0,3}' required /></td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit" id='update' value="Izmeni" />
                    </form>
                ) : (<>
                    <form onSubmit={handleSubmit2}>
                        <table>
                            <tbody>
                                <tr>
                                    <th id='tableLineBottom'>Ime:</th>
                                    <th id='tableLineBottom'>Prezime:</th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'><input type="text" name="ime" value={ime || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z]{3,}+" required /></td>
                                    <td id='tableLineTop'><input type="text" name="prezime" value={prezime || ""} onChange={handleInputChange} pattern="[A-Z][a-zA-Z]{3,}+" required /></td>
                                </tr>
                                <tr>
                                    <th id='tableLineBottom'>Email:</th>
                                    <th id='tableLineBottom'></th>
                                </tr>
                                <tr>
                                    <td id='tableLineTop'>{informationUser.email}</td>
                                    <td id='tableLineTop'></td>
                                </tr>
                            </tbody>
                        </table>
                        <input type="submit" id='update1' value="Izmeni" />
                    </form>
                </>)}
            </div>
        </div>
    )
}
