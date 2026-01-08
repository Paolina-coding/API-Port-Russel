const Reservation = require('../models/reservation');

/**
 * Récupère la liste de toutes les réservations peu importe le catway.
 * 
 * - Retourne 200 avec un tableau de réservations si l’opération réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Tableau de réservations ou message d’erreur
 */

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
};

/**
 * Récupère toutes les réservations actuellement actives.
 *
 * La fonction détermine la date du jour, puis recherche toutes les réservations dont la période est en cours :
 * - `startDate` inférieure ou égale à aujourd’hui
 * - `endDate` supérieure ou égale à aujourd’hui
 *
 * - Retourne 200 avec un tableau de réservations actives (qui peut être vide).
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Tableau des réservations actives ou message d’erreur
 */

exports.getCurrentReservations = async (req, res) => {
    try {
        const today = new Date();

        const reservations = await Reservation.find({
            startDate: { $lte: today },
            endDate: { $gte: today }
        });

        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
};
