import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { LOAD_USERS } from "../MQ/Queries";
import { DELETE_USER_MUTATION } from "../MQ/Mutations";

function GetUsers() {
    const { data } = useQuery(LOAD_USERS);
    const [users, setUsers] = useState([]);
    const [deleteUser] = useMutation(DELETE_USER_MUTATION);

    useEffect(() => {
        if (data) {
            setUsers(data.getAllUsers);
        }
    }, [data]);

    const handleDeleteUser = (userId) => {
        deleteUser({ variables: { id: userId } })
            .then((response) => {
                // Obrada odgovora nakon brisanja korisnika
                // Na primer, osvežavanje liste korisnika
                const updatedUsers = users.filter((user) => user.id !== userId);
                setUsers(updatedUsers);

            })
            .catch((error) => {
                // Obrada greške ako dođe do problema
            });
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        console.log("obrisano")
    };


    return (
        <div>
            {" "}
            {users.map((val, index) => {
                return (<div key={val.id + index}>
                    {val.firstName}
                    <button onClick={() => handleDeleteUser(val.id)}>Obriši</button>
                </div>
                );
            })}
        </div>
    );
}

export default GetUsers;