const Reservation = require('../models/reservation');
const Catway = require('../models/catway');

/* Récupérer la liste des reservations d'un catway */
exports.getList = async (req, res) => {
    const catwayNumber = req.params.catwayNumber;

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

/* Récuperer les détails d'une réservation avec son identifiant*/
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

/* Ajouter une reservation */
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



/* Modifier une reservation */
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

/* Supprimer une réservation */
exports.delete = async (req, res) => {
    const reservationId = req.params.idReservation
    
    try{
        await Reservation.deleteOne({_id : reservationId});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}