import { Link } from "react-router-dom";
import { useState } from "react";

const Reservations = () => {
  const [catwayId, setCatwayId] = useState("");
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
                                <p>Lien avec MongoDB à faire</p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Rechercher un catway pour des détails ou pour sa suppression</h3>
            <div className="d-flex gap-2 mb-4">
                <input type="number" className="form-control" placeholder="Numéro du catway" value={catwayId} onChange={(e) => setCatwayId(e.target.value)}/>
                <Link className="btn btn-primary" to={`/catways/${catwayId}`} disabled={!catwayId} >Détails</Link>
                <Link className="btn btn-danger" to={`/catways/${catwayId}/delete`} disabled={!catwayId} >Supprimer</Link>
            </div>
            
            <h3>Modifier un catway</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="InputNumber" className="form-label">Numero du catway</label>
                    <input type="number" className="form-control" id="catwayNumber"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputState" className="form-label">Nouvel état</label>
                    <input type="text" className="form-control" id="catwayState"/>
                </div>
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>   
            <h3>Ajouter un catway</h3>
            <form>
                <div className="row mb-3">
                    <label htmlFor="InputNumber" className="col-sm-2 col-form-label">Numero du catway</label>
                    <div class="col-sm-10">
                        <input type="number" className="form-control" id="catwayNumber"/>
                    </div>
                </div>
                <fieldset class="row mb-3">
                    <legend class="col-form-label col-sm-2 pt-0">Type</legend>
                    <div class="col-sm-10">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="LongType" id="LongType"/>
                            <label class="form-check-label" for="LongType">Long</label>
                            </div>
                            <div class="form-check">
                            <input class="form-check-input" type="radio" name="ShortType" id="ShortType" checked/>
                            <label class="form-check-label" for="ShortType">Short</label>
                        </div>
                    </div>
                </fieldset>
                <div className="row mb-3">
                    <label htmlFor="InputState" className="col-sm-2 col-form-label">Etat du catway</label>
                    <div class="col-sm-10">
                        <input type="text" className="form-control" id="catwayState"/>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>
            </form>  
        </div>      
    </main>
  );
};

export default Reservations;
