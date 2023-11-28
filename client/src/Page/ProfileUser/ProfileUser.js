import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { User } from './User/User';
import { Employee } from './Employee/Employee';
import { Admin } from './Admin/Admin';

import './profileUser.css'

export const ProfileUser = () => {

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
    <div className='containerProfile'>
      {(informationUser.type === "Korisnik") ? (
        <User />
      ) : (informationUser.type === "Zaposleni") ? (
        <Employee />
      ) : (informationUser.type === "Admin") && (
        <Admin />
      )}
    </div>

  )
}
