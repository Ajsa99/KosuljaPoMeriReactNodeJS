import React, { useContext, useState } from 'react'
import axios from 'axios';
import "./reg.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../helpers/AuthContext';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';

function Login() {

  const history = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { email: email, password: password };

    axios.post("http://localhost:5000/login", data).then((response) => {
      if (response.data.message) {
        alert(response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
        window.location.reload(history('/'));
      }
    }

    );
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">Prijava</div>
        <div className='form'>
          <div className="row">
            <i className="fas fa-lock"><MdEmail /></i>
            <input type="text" placeholder='Email' onChange={(event) => { setEmail(event.target.value) }} />
          </div>
          <div className="row">
            <i className="fas fa-lock"><RiLockPasswordFill /></i>
            <input type="password" placeholder='Lozinka' onChange={(event) => { setPassword(event.target.value) }} />
          </div>

          <div className="row button">
            <button onClick={login}>Prijavite se</button>
          </div>

          <Link to="/resetPassword" className="pass link">Zaboravili ste šifru?</Link>

        </div>
      </div>
    </div>
  )
}

export default Login