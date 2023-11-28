import React, { useState } from 'react'
import axios from 'axios';
import "./reg.css";
import { MdEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io'


export const ResetPassword = () => {

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const handleForgotPassword = () => {

    axios.post("http://localhost:5000/forgotPassword", { email: forgotPasswordEmail })
      .then(response => {
        if (response.data.message) {
          alert(response.data.message);
          setForgotPasswordEmail("");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Došlo je do greške prilikom slanja emaila.");
      });
  };


  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">Zaboravili ste šifru</div>
        <div className='form'>
          <div className="row">
            <i className="fas fa-lock"><MdEmail /></i>
            <input type="text" placeholder="Email" value={forgotPasswordEmail} onChange={event => setForgotPasswordEmail(event.target.value)} />
          </div>

          <div className="row button">
            <button onClick={handleForgotPassword}>Pošalji zahtev</button>
          </div>

          <Link to='/login' className='loginBack link'><IoIosArrowBack />Nazad na prijavu!</Link>

        </div>
      </div>
    </div>
  )
}

