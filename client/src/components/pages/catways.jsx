import { Link } from "react-router-dom";
import { useState } from "react";
import CatwayList from '../catwayList';

const Catways = () => {
    const [newNumber, setNewNumber] = useState("");
    const [newType, setNewType] = useState("");
    const [newState, setNewState] = useState("");
    const [catwayNumber, setCatwayNumber] = useState("");
    const [deleteNumber, setDeleteNumber] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [updateNumber, setUpdateNumber] = useState(""); 
    const [updateState, setUpdateState] = useState("");

//ajout d'un nouveau catway
    const addCatway = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!newNumber || !newType || !newState) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const newCatway = {
            catwayNumber: newNumber,
            catwayType: newType,
            catwayState: newState
        };

        try {
            const response = await fetch("/catways/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCatway)
            });

            if (response.ok) {
                alert("Catway ajouté !");
                setNewNumber("");
                setNewType("");
                setNewState("");
                setRefresh(prev => !prev); //refresh de la liste des catways

            } else {
                alert("Erreur lors de l'ajout");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur serveur");
        }
    };

//modification d'un catway
const updateCatway = async (e) => {
    e.preventDefault();

    if (!updateNumber || !updateState) {
        alert("Veuillez remplir tous les champs");
        return;
    }

    try {
        const response = await fetch(`/catways/${updateNumber}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ catwayState: updateState })
        });

        if (response.ok) {
            alert("Catway modifié !");
            setUpdateNumber("");
            setUpdateState("");
            setRefresh(prev => !prev); // refresh de la liste
        } else {
            alert("Erreur lors de la modification");
        }
    } catch (error) {
        console.error(error);
        alert("Erreur serveur");
    }
};


//suppression d'un catway
    const deleteCatway = async (e) => {
        e.preventDefault(); // empêche le rechargement de la page
        if (!deleteNumber) {
            alert("Veuillez entrer le numéro du catway à supprimer");
            return;
        }

        try {
            const response = await fetch(`/catways/${deleteNumber}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Catway supprimé !");
                setCatwayNumber("");
                setRefresh(prev => !prev); //refresh de la liste des catways

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
            <h2>Vous pouvez gérer les catways ici</h2>
            <div className="mb-4">
                <h3>Liste des catways</h3>
                <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#ModalList">Afficher</button>
            </div>

            {/*Modale*/}
            <div className="modal fade" id="ModalList" tabindex="-1" aria-hidden="true"> 
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-dark text-white">
                        <div className="modal-header">
                            <h3 className="modal-title" id="modalLabel">Liste des catways</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row align-items-center">
                               <CatwayList refresh={refresh} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Rechercher les détails d'un catway</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="number" className="form-control" placeholder="Numéro du catway" value={catwayNumber} onChange={(e) => setCatwayNumber(e.target.value)}/>
                <Link className="btn btn-primary" to={`/catways/${catwayNumber}`}>Détails</Link>
            </div>
            <h3>Supprimer un catway</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="number" className="form-control" placeholder="Numéro du catway à supprimer" value={deleteNumber} onChange={(e) => setDeleteNumber(e.target.value)}/>
                <button className="btn btn-danger" onClick={deleteCatway}>Supprimer</button>

            </div>

            <h3>Modifier un catway</h3>
            <form onSubmit={updateCatway}>
                <div className="mb-3">
                    <input placeholder="Numéro du catway" type="number" className="form-control" value={updateNumber} onChange={(e) => setUpdateNumber(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input placeholder="Nouvel état" type="text" className="form-control" value={updateState} onChange={(e) => setUpdateState(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>   
            <h3>Ajouter un catway</h3>
            <form onSubmit={addCatway}>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Numéro du nouveau catway</label>
                    <div className="col-sm-8">
                        <input type="number" className="form-control" value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
                    </div>
                </div>
                <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Type</legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="type" value="long" checked={newType === "long"} onChange={(e) => setNewType(e.target.value)}/>
                            <label className="form-check-label">Long</label>
                            </div>
                            <div class="form-check">
                            <input className="form-check-input" type="radio" name="type" value="short" checked={newType === "short"} onChange={(e) => setNewType(e.target.value)}/>
                            <label class="form-check-label">Short</label>
                        </div>
                    </div>
                </fieldset>
                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Etat du catway</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" value={newState} onChange={(e) => setNewState(e.target.value)}/>
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

export default Catways;


