import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

export const AccessAdmin = () => {

    const [ admins, setAdmins ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ filteredUsers, setFilteredUsers ] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5001/accessadmins').then((response)=>{
            setAdmins(response.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        setFilteredUsers(
          admins.filter((user) => {
            return user.ime.toLowerCase().includes(searchTerm.toLowerCase());
          })
        );
      }, [searchTerm, admins]);

    const Accept = (id) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");
        
        if (userConfirmation === true) {
            
            axios.put(`http://localhost:5001/acceptadmin/${id}`).then((response)=>{})
            alert("Odobrili ste pristup");

            const newAdminsList = admins.filter(user => user.id !== id);
            setAdmins(newAdminsList);
        }
    }

    const Delete = (id) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");
        
        if (userConfirmation === true) {

        axios.delete(`http://localhost:5001/deleteadmin/${id}`).then((response)=>{})
            alert("Odbijeno");
            
            const newAdminsList = admins.filter(user => user.id !== id);
            setAdmins(newAdminsList);
        }
        
    }


  return (
    <div className='allusers'>
    <div className='info'>
        <p><strong>Administratori</strong> na čekanju</p>
        <input placeholder='Pretrazite...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
    </div>
    <div className='table'>
        <table>
            <tr>
                <th>id</th>
                <th>Ime i prezime</th>
                <th>Email</th>
                <th colSpan={2}></th>
            </tr>
            {filteredUsers.map((user, index)=>{
                return(
                    <tr key={user.id}>
                        <td>{index+1}</td>
                        <td>{user.ime} {user.prezime}</td>
                        <td>{user.email}</td>
                        <td><button onClick={()=>Accept(user.id)}><BsFillCheckCircleFill size={25} color='green'/></button></td>
                        <td><button onClick={()=>Delete(user.id)}><BsFillXCircleFill size={25} color='darkred'/></button></td>
                    </tr>
            )})}
        </table>
    </div>
  </div>
  )
}
