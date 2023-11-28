import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

export const AccessEmployee = () => {

    const [employee, setEmployee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5001/accessemployee').then((response) => {
            setEmployee(response.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setFilteredUsers(
            employee.filter((user) => {
                return user.ime.toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }, [searchTerm, employee]);

    const Accept = (id) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.put(`http://localhost:5001/acceptemployee/${id}`).then((response) => { })
            alert("Odobrili ste pristup");

            const newEmployeeList = employee.filter(user => user.id !== id);
            setEmployee(newEmployeeList);
        }

    }

    const Delete = (id) => {
        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.delete(`http://localhost:5001/deleteemployee/${id}`).then((response) => { })
            alert("Odbijeno");

            const newEmployeeList = employee.filter(user => user.id !== id);
            setEmployee(newEmployeeList);
        }

    }

    return (
        <div className='allusers'>
            <div className='info'>
                <p><strong>Zaposleni</strong> na čekanju</p>
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
                        <th colSpan={2}></th>
                    </tr>
                    {filteredUsers.map((user, index) => {
                        return (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.ime} {user.prezime}</td>
                                <td>{user.email}</td>
                                <td><button onClick={() => Accept(user.id)}><BsFillCheckCircleFill size={25} color='green' /></button></td>
                                <td><button onClick={() => Delete(user.id)}><BsFillXCircleFill size={25} color='darkred' /></button></td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}

