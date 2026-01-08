const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

/**
 * Récupère la liste des réservations associées au catway avec un numéro.
 *
 * Vérification que le catway correspondant au numéro fourni dans l’URL existe.
 * - Si le catway n’existe pas, elle renvoie une erreur 404.
 * - Si le catway existe, elle récupère toutes les réservations liées à ce catway.
 * - En cas d’erreur interne (ex : problème MongoDB), une erreur 500 est renvoyée.
 *
 * @param {Object} req - Requête Express contenant `catwayNumber` dans `req.params.catwayNumber`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Tableau de réservations ou message d’erreur
 */
exports.getList = async (req, res) => {
    const catwayNumber = Number(req.params.catwayNumber);

    try {
        const catway = await Catway.findOne({ catwayNumber: catwayNumber });
        if (!catway) {
            return res.status(404).json('catway_not_found');
        }
        let reservation = await Reservation.find({ catwayNumber: catwayNumber });

        return res.status(200).json(reservation);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * Récupère une réservation à partir de son identifiant.
 *
 * Vérification si la réservation correspondant à l’ID fourni dans les paramètres d’URL existe. 
 * - Si aucune réservation ne correspond, elle renvoie une erreur 404.
 * - Si la réservation existe, vérifications qu’elle appartient bien au catway indiqué dans l’URL.  
 * - Si les numéros ne correspondent pas, une erreur 400 est renvoyée pour signaler une incohérence entre la réservation et le catway demandé.
 * - Si les numéros correspondent, la réservation est renvoyée avec un statut 200.
 * - En cas d’erreur interne (ex : problème MongoDB), une erreur 500 est renvoyée.
 *
 * @param {Object} req - Requête Express contenant `idReservation` et `catwayNumber` dans `req.params`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} La réservation trouvée ou un message d’erreur
 */
exports.getById = async (req, res) => {
    const idReservation = req.params.idReservation;
    const catwayNumber = Number(req.params.catwayNumber);

    try{
        let reservation = await Reservation.findOne({_id : idReservation});

        if (!reservation) {
            return res.status(404).json("reservation_not_found"); 
        } 
        if (reservation.catwayNumber !== catwayNumber) {
            return res.status(400).json("catway_mismatch"); 
        } 
        return res.status(200).json(reservation);

    } catch(error) {
        return res.status(500).json(error);
    }
}

/**
 * Ajoute une nouvelle réservation pour un catway avec son numéro.
 *
 * Vérification que le catway indiqué dans l’URL existe.
 * - Si le catway n’existe pas, une erreur 404 est renvoyée.
 * - Si le catway existe bien, une nouvelle réservation est créée à partir des données fournies dans le corps de la requête (`clientName`, `boatName`, `startDate`, `endDate`, etc.).
 * - Retourne 201 avec la réservation créée si tout se passe bien.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB, données invalides).
 *
 * @param {Object} req - Requête Express contenant `catwayNumber` dans `req.params` et les informations de réservation dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} La réservation créée ou un message d’erreur
 */

exports.add = async (req, res) => {
    const catwayNumber = Number(req.params.catwayNumber);
    const temp = ({
            catwayNumber: req.body.catwayNumber,
            clientName : req.body.clientName,
            boatName: req.body.boatName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

    try {
        const catway = await Catway.findOne({ catwayNumber: catwayNumber });
        if (!catway) {
            return res.status(404).json('catway_not_found');
        }
        const reservation = await Reservation.create(temp);
        return res.status(201).json(reservation);

    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};



/**
 * Modifie une réservation avec son identifiant pour un catway avec son numéro.
 *
 * Vérification que la réservation correspondant à l’ID fourni dans les paramètres d’URL existe.  
 * - Si aucune réservation ne correspond, une erreur 404 est renvoyée.
 * - Vérification que la réservation appartient bien au catway indiqué dans l’URL sinon erreur 404
 * - Si la réservation est valide, mise à jour partielle avec les champs de `req.body`puis sauvegarde de la réservation
 * - Retourne 200 si la mise à jour réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} req - Requête Express contenant `idReservation` et `catwayNumber` dans `req.params`,
 *                       ainsi que les champs à modifier dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */
exports.update = async (req, res) => {
    const reservationId = req.params.idReservation;
    const catwayNumber = Number(req.params.catwayNumber);

    const temp = ({
        clientName : req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    try{
        let reservation = await Reservation.findOne({_id: reservationId});
        if (!reservation) {
            return res.status(404).json('reservation_not_found');
        }
        if(reservation.catwayNumber !== catwayNumber) { 
            return res.status(400).json("catway_mismatch"); 
        }
        Object.keys(temp).forEach((key) => {
            if (temp[key] !== undefined && temp[key] !== "") {
                reservation[key] = temp[key]; 
            }
        });

        await reservation.save();
        return res.status(200).json('update_ok');
    }
    
    catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Supprime une réservation à partir de son identifiant.
 *
 * - La fonction supprime la réservation correspondant à l’ID fourni dans les paramètres d’URL. 
 * - Retourne 200 avec le message `delete_ok` lorsque l’opération réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème de connexion à la base).
 *
 * @param {Object} req - Requête Express contenant l’identifiant de la réservation dans `req.params.idReservation`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */

exports.delete = async (req, res) => {
    const reservationId = req.params.idReservation
    
    try{
        await Reservation.deleteOne({_id : reservationId});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}