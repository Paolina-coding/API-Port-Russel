import { useEffect, useState } from "react";

/**
 * Affiche la liste des utilisateurs.
 *
 * Le composant effectue un appel API vers `/users` 
 * Le token JWT est récupéré depuis le `localStorage` et envoyé dans l’en-tête `Authorization` comme la requête est sécurisée.
 *
 * - Le `useEffect` se déclenche à chaque changement de `refresh`, pour recharger automatiquement la liste après un ajout, modification ou suppression.
 * - Les utilisateurs sont renvoyés dans une liste avec nom d’utilisateur et adresse email.
 *
 * @component
 * @param {Object} props - Les propriétés du composant
 * @param {number|string} props.refresh - Déclenche le rechargement de la liste lorsqu’il change
 * @returns {JSX.Element} Une liste des utilisateurs affichée dans un `<ul>`
 */
const UserList = ({refresh}) => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("/users", { headers: { "Authorization": "Bearer " + token }})
        .then(res => res.json())
        .then(data => setUsers(data))
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
