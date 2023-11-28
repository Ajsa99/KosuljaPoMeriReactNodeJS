import React, { useState } from 'react'
import image from './image/contact.png'
import { MdNavigateNext } from 'react-icons/md'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import './contact.css'

export const Contact = () => {

    let { id } = useParams();

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [sendMessageP, setSendMessageP] = useState("")

    const sendMessage = (message) => {

        if (message.length < 100) {
            setError("Poruka mora da sadrzi najmanje 100 karaktera!");
            setSendMessageP("");
        } else {

            const userConfirmation = window.confirm("Da li ste sigurni?");

            if (userConfirmation === true) {

                axios.post(`http://localhost:5001/messageSend/${id}`, { message }).then((response) => {
                    if (response.data.resmessage) {
                        setSendMessageP(response.data.resmessage);
                        setMessage("");
                    }
                });
            }
        }
    }

    return (
        <div className='Contact'>
            <div className='left'>
                <p>Ukoliko imate nekih dodatnih pitanja kontaktirajte nas</p>
                <img src={image} alt='contact' />
            </div>
            <div className='right'>
                <h3>Pošaljite nam poruku:</h3>
                <hr />
                <div>
                    <label>Poruka:</label>
                    <textarea name="message" rows="4" cols="50" onChange={(e) => { setMessage(e.target.value); if (e.target.value.length > 100) { setError("") } }} value={message}></textarea>
                    <p style={{ color: 'red' }}>{error}</p>
                    <p style={{ color: 'green', paddingBottom: '5px' }}>{sendMessageP}</p>
                    <button onClick={() => { sendMessage(message) }}>Pošalji <MdNavigateNext className='size' size={22} /></button>
                </div>
            </div>
        </div>
    )
}
