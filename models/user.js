const mongoose = require('mongoose');
const Schema = mongoose.Schema;
constbcrypt = require('bcrypt');

const User = new Schema({
    username:{
        type : String,
        trim : true,
        required : [true, 'Le nom d\'utilisateur est requis']
    },
    email: {
        type : String,
        trim : true,
        required : [true, 'L\'email est requis'],
        unique : true,
        lowercase : true
    },
    password: {
        type: String,
        required : [true, 'L\'email est requis'],
        minlength: [10, 'Le mot de passe doit contenir au moins 10 caractères']
    }
}, {
    timestamps: true,
});

User.pre('save', function(next){
    if (!this.isModified('password')){
        return next();
    }

    this.password = bcrypt.hashSync(this.password, 10);

    next();
});

module.exports = mongoose.model('User',User)