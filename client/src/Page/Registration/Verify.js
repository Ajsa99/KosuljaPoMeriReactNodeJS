import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export const Verify = () => {

    let { accessToken } = useParams()

    const history = useNavigate();

    const onClick = () => {
        axios.put(`http://localhost:5000/verify/${accessToken}`)
            .then(response => {
                if (response) {
                    alert(response.data);
                    history('/login')
                }
            })
            .catch(error => {
                console.error(error);
                alert("Došlo je do greške prilikom verifikacije.");
            });
    }

    return (
        <div style={{ height: '60vh' }} className='center'>
            <h1>Verifikujte svoj nalog</h1>
            <h4 style={{ color: 'blue', cursor: 'pointer' }} onClick={onClick}>LINK</h4>

        </div>
    )
}
