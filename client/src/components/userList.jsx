import { useEffect, useState } from "react";

const UserList = ({refresh}) => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("/users", { headers: { "Authorization": "Bearer " + token }})
        .then(res => res.json())
        .then(data => {console.log("DATA REÇUE :", data);
            setUsers(data);})
        .catch(err => console.error(err));
    }, [refresh]);

    return (
        <div>
        <ul>
            {users.map(u => (
            <li key={u._id}>Nom d'utilisateur {u.username} - Adresse mail: {u.email}</li>
            ))}
        </ul>
        </div>
    )};

export default UserList;
