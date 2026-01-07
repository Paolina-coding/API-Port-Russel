const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catway = new Schema({
    catwayNumber:{
        type : Number,
        required : [true, 'Le numéro est requis'],
        unique : true
    },
    catwayType: {
        type : String,
        trim : true,
        required : [true, 'Le type est requis'],
        enum: {
            values: ['long', 'short'],
            message: 'Le type doit être "long" ou "short"'
        }
    },
    catwayState: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Catway', Catway);