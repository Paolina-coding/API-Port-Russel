import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import ReservationList from '../reservationList';

const ReservationsCatway = () => {
    const {catwayNumber} = useParams();
    const [newClientName, setNewClientName] = useState("");
    const [newBoatName, setNewBoatName] = useState("");
    const [newStartDate, setNewStartDate] = useState("");
    const [newEndDate, setNewEndDate] = useState("");
    const [reservationId, setReservationId] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [updateId, setUpdateId] = useState("");
    const [updateClientName, setUpdateClientName] = useState(undefined);
    const [updateBoatName, setUpdateBoatName] = useState(undefined);
    const [updateStartDate, setUpdateStartDate] = useState(undefined);
    const [updateEndDate, setUpdateEndDate] = useState(undefined);

//ajout d'une nouvelle réservation
    const addReservation = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!newClientName || !newBoatName || !newStartDate || !newEndDate) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const newReservation = {
            catwayNumber : Number(catwayNumber),
            clientName : newClientName,
            boatName : newBoatName,
            startDate : newStartDate,
            endDate : newEndDate,
        };

        try {
            const response = await fetch(`/catways/${catwayNumber}/reservations/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newReservation)
            });

            if (response.ok) {
                alert("Réservation ajoutée !");
                setNewClientName("");
                setNewBoatName("");
                setNewStartDate("");
                setNewEndDate("");
                setRefresh(prev => !prev); //refresh de la liste des réservations

            } else {
                alert("Erreur lors de l'ajout");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

//modification d'une réservation 
const updateReservation = async (e) => {
    e.preventDefault();

    if (!updateId) {
        alert("Veuillez entrer l'identifiant de la réservation à modifier.");
        return;
    }

    const body = {};

    if (updateClientName !== undefined) body.clientName = updateClientName; 
    if (updateBoatName !== undefined) body.boatName = updateBoatName; 
    if (updateStartDate !== undefined) body.startDate = updateStartDate; 
    if (updateEndDate !== undefined) body.endDate = updateEndDate;
    console.log("BODY ENVOYÉ :", body);
    if (Object.keys(body).length === 0) {
        alert("Aucun champ à modifier.");
        return;
    }

    const response = await fetch(`/catways/${catwayNumber}/reservations/${updateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        alert("Réservation modifiée !");
        setRefresh(prev => !prev);
    } else {
        alert("Erreur lors de la modification");
    }
};

//suppression d'une réservation
    const deleteReservation = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!deleteId) {
            alert("Veuillez entrer l'id de la réservation à supprimer. Vous pouvez trouver celui ci en regardant la liste des réservations.");
            return;
        }

        try {
            const response = await fetch(`/catways/${catwayNumber}/reservations/${deleteId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Réservation supprimée !");
                setDeleteId("");
                setRefresh(prev => !prev); //refresh de la liste des réservations

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
        <h1>Catways</h1>
      </div>
      <hr />
        <div>
            <h2>Vous pouvez gérer les réservations du catway numéro {catwayNumber} ici</h2>
            <div className="mb-4">
                <h3>Liste des réservations</h3>
                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#ModalList">Afficher</button>
            </div>

            {/*Modale*/}
            <div className="modal fade" id="ModalList" tabIndex="-1" aria-hidden="true"> 
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel">Liste des réservations</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                               <ReservationList refresh={refresh} /> 
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Rechercher les détails d'une réservation</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="text" className="form-control" placeholder="Identifiant de la réservation" value={reservationId} onChange={(e) => setReservationId(e.target.value)}/>
                <Link className="btn btn-primary" to={`/catways/${catwayNumber}/reservations/${reservationId}`}>Détails</Link>
            </div>

            <h3>Ajouter une réservation</h3>
            <form onSubmit={addReservation}>
                <div className="row mb-3">
                    <input type="text" className="form-control" placeholder="Nom du client" value={newClientName} onChange={(e) => setNewClientName(e.target.value)}/>               
                    <input type="text" className="form-control" placeholder="Nom du bateau" value={newBoatName} onChange={(e) => setNewBoatName(e.target.value)}/>
                    <label className="col-sm-3 col-form-label">Date de début de la réservation</label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)}/>
                    </div>
                    <label className="col-sm-3 col-form-label">Date de fin de la réservation</label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)}/>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
            </form> 

            <h3>Modifier une réservation</h3>
            <form onSubmit={updateReservation}>
                <div className="row mb-3">
                    <input type="text" className="form-control mb-2" placeholder="ID de la réservation (obligatoire)" value={updateId} onChange={(e) => setUpdateId(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Nouveau nom du client" value={updateClientName} onChange={(e) => setUpdateClientName(e.target.value)}/>
                    <input type="text" className="form-control mb-2" placeholder="Nouveau nom du bateau" value={updateBoatName} onChange={(e) => setUpdateBoatName(e.target.value)}/>
                    <label className="col-sm-3 col-form-label">Nouvelle date de début de la réservation</label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" value={updateStartDate} onChange={(e) => setUpdateStartDate(e.target.value)}/>
                    </div>
                    <label className="col-sm-3 col-form-label">Nouvelle date de fin de la réservation</label>
                    <div className="col-sm-9">
                        <input type="date" className="form-control" value={updateEndDate} onChange={(e) => setUpdateEndDate(e.target.value)}/>
                    </div>
                </div>
                <button className="btn btn-primary">Modifier</button>
            </form>

            <h3>Supprimer une réservation</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="text" className="form-control" placeholder="Identifiant de la réservation à supprimer" value={deleteId} onChange={(e) => setDeleteId(e.target.value)}/>
                <button className="btn btn-danger" onClick={deleteReservation}>Supprimer</button>

            </div>

            <div className="text-center mt-3">
                <Link to="/reservations" className="btn btn-secondary">Retour à la sélection du catway</Link>
            </div>
        </div>      
    </main>
  );
};

export default ReservationsCatway;


