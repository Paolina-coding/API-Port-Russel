const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* Récupérer la liste des utilisateurs */
exports.getList = async (req, res, next) => {
    try {
        let users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/* Récuperer un utilisateur avec son email*/
exports.getByEmail = async (req, res) => {
    const email = req.params.email

    try{
        let user = await User.findOne({email : email});

        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json('user_not_found');
    } catch(error) {
        return res.status(500).json(error);
    }
}

/* Ajouter un utilisateur */
exports.add = async (req, res) => {
    const temp = ({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password
    });

    try{
        let user = await User.create(temp);
        
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/* Modifier un utilisateur */
exports.update = async (req, res) => {
    const email = req.params.email;
    const temp = ({
        username : req.body.username,
        email : req.body.email,
        password: req.body.password
    });

    try{
        let user = await User.findOne({email : email});
        if (user) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    user[key] = temp[key];
                }
            });
            await user.save();
            return res.status(200).json('update_ok');
        }
        else {
            return res.status(404).json('user_not_found');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

/* Supprimer un utilisateur */
exports.delete = async (req, res) => {
    const email = req.params.email
    
    try{
        await User.deleteOne({email: email});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}

/*authentification utilisateur*/
exports.authenticate = async (req, res) => {
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email: email}, '-__v -createdAt -updatedAt');

        if (user) {
            bcrypt.compare(password, user.password, function(err, response){
                if (err) {
                    throw new Error(err);
                }
                if (response) {
                    const userData = { ...user._doc };
                    delete user._doc.password;

                    const expireIn = 24 * 60 * 60;
                    const token = jwt.sign({
                        user: user
                    },
                    process.env.SECRET_KEY,
                    {
                        expiresIn: expireIn
                    });
                    
                    res.header('Authorization', 'Bearer ' + token);
                    return res.status(200).json({
                        message: 'authenticate_succeed', 
                        token: token, 
                        user: userData}
                    );
                }
                return res.status(403).json('wrong_credentials');
            });
        } else {
            return res.status(404).json('user_not_found');
        }
    } catch (error){
        return res.status(500).json(error);
    }
}