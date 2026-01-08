const Reservation = require('../models/reservation');

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json(err);
    }
};

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
