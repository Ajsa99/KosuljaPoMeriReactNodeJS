import React, { useState } from 'react'
import { RiLockPasswordFill } from 'react-icons/ri'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export const NewPassword = () => {

  const history = useNavigate();

  let { accessToken } = useParams();

  const [newPassword, setNewPassword] = useState("");

  const handleNewPassword = () => {

    axios.post(`http://localhost:5000/resetPassword/${accessToken}`, { newPassword: newPassword })
      .then(response => {
        if (response.data.message) {
          alert(response.data.message);
          history('/login')
        }
      })
      .catch(error => {
        console.error(error);
        alert("Došlo je do greške prilikom promene šifre.");
      });
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">Unesi novu šifru:</div>
        <div className='form'>

          <div className="row">
            <i className="fas fa-lock"><RiLockPasswordFill /></i>
            <input type="text" placeholder='Nova šifra' onChange={(event) => { setNewPassword(event.target.value) }} />
          </div>

          <div className="row button">
            <button onClick={handleNewPassword}>Potvrdi</button>
          </div>

        </div>
      </div>
    </div>
  )
}
