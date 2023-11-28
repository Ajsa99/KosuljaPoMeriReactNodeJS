import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiFillEye } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

export const AllUsers = () => {

    let { id } = useParams();

    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5001/allusers').then((response) => {
            setUsers(response.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setFilteredUsers(
            users.filter((user) => {
                return user.ime.toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }, [searchTerm, users]);

    return (
        <div className='allusers'>
            <div className='info'>
                <p>Informacije o <strong>Korisnicima</strong></p>
                <input placeholder='Pretrazite...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className='table'>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Ime i prezime</th>
                        <th id='none'>Email</th>
                        <th id='none'>Kontakt</th>
                        <th>...</th>
                    </tr>
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.ime} {user.prezime}</td>
                                <td id='none'>{user.email}</td>
                                <td id='none'>{user.kontakt}</td>
                                <td><Link to={`/viewUser/${id}/${user.id}`}><AiFillEye color='#03C3FF' size={17} /></Link></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
