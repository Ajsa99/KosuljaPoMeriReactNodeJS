import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const AllAdmin = () => {

    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5001/alladmins').then((response) => {
            setAdmins(response.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setFilteredUsers(
            admins.filter((user) => {
                return user.ime.toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }, [searchTerm, admins]);

    return (
        <div className='allusers'>
            <div className='info'>
                <p>Informacije o <strong>Administratorima</strong></p>
                <input placeholder='Pretrazite...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className='table'>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Ime i prezime</th>
                        <th>Email</th>
                    </tr>
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.ime} {user.prezime}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}
