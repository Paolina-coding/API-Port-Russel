import { Link } from "react-router-dom";
import { useState } from "react";
import UserList from "../userList";

const Utilisateurs = () => {
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState("");
    const [deleteEmail, setDeleteEmail] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [updateEmail, setUpdateEmail] = useState(""); 
    const [updateUsername, setUpdateUsername] = useState(""); 
    const [updatePassword, setUpdatePassword] = useState("");
    const token = localStorage.getItem("token");

//ajout d'un nouvel utilisateur
    const addUser = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!newUsername || !newEmail || !newPassword) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const newUser = {
            username : newUsername,
            email: newEmail,
            password: newPassword
        };

        try {
            const response = await fetch("/users/add", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert("Utilisateur ajouté !");
                setNewUsername("");
                setNewEmail("");
                setNewPassword("");
                setRefresh(prev => !prev); //refresh de la liste des utilisateurs

            } else {
                alert("Erreur lors de l'ajout");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

//modification d'un utilisateur
const updateUser = async (e) => {
    e.preventDefault();

    if (!updateEmail) {
        alert("Veuillez entrer l'adresse mail de l'utilisateur à modifier.");
        return;
    }

    const body = {};

    if (updateUsername !== undefined) body.username = updateUsername; 
    if (updatePassword !== undefined) body.password = updatePassword; 
    if (Object.keys(body).length === 0) {
        alert("Aucun champ à modifier.");
        return;
    }

    const response = await fetch(`/users/${updateEmail}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        alert("Utilisateur modifié !");
        setUpdatePassword("");
        setUpdateUsername("");
        setUpdateEmail("");
        setRefresh(prev => !prev);
    } else {
        alert("Erreur lors de la modification");
    }
};


//suppression d'un utilisateur
    const deleteUser = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!deleteUser) {
            alert("Veuillez entrer l'email de l'utilisateur à supprimer");
            return;
        }

        try {
            const response = await fetch(`/users/${deleteEmail}`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });

            if (response.ok) {
                alert("Utilisateur supprimé !");
                setDeleteEmail("");
                setRefresh(prev => !prev); //refresh de la liste des utilisateurs

            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

//affichage du site
  return (
    <main className="container">
      <div className="text-center">
        <h1>Utilisateurs</h1>
      </div>
      <hr />
        <div>
            <h2>Vous pouvez gérer les utilisateurs ici</h2>
            <div className="mb-4">
                <h3>Liste des utilisateurs</h3>
                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#ModalList">Afficher</button>
            </div>

            {/*Modale*/}
            <div className="modal fade" id="ModalList" tabIndex="-1" aria-hidden="true"> 
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel">Liste des utilisateurs</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                               <UserList refresh={refresh} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Rechercher les détails d'un utilisateur</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="text" className="form-control" placeholder="email de l'utilisateur" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Link className="btn btn-primary" to={`/users/${email}`}>Détails</Link>
            </div>
            <h3>Supprimer un utilisateur</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="text" className="form-control" placeholder="Email de l'utilisateur à supprimer" value={deleteEmail} onChange={(e) => setDeleteEmail(e.target.value)}/>
                <button className="btn btn-danger" onClick={deleteUser}>Supprimer</button>

            </div>

            <h3>Modifier un utilisateur</h3>
            <form onSubmit={updateUser}>
                <div className="mb-3">
                    <input placeholder="Email de l'utiliateur" type="text" className="form-control" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input placeholder="Nouveau nom d'utilisateur" type="text" className="form-control" value={updateUsername} onChange={(e) => setUpdateUsername(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input placeholder="Nouveau mot de passe" type="password" className="form-control" value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>   
            <h3>Ajouter un utilisateur</h3>
            <form onSubmit={addUser}>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Email du nouvel utilisateur</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Nom d'utilisateur</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Mot de passe</label>
                    <div className="col-sm-8">
                        <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
            </form> 
            <Link className="btn btn-secondary m-5" to={`/tableau_de_bord`}>Retour au tableau de bord</Link> 
        </div>      
    </main>
  );
};

export default Utilisateurs;