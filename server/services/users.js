const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Récupère la liste des utilisateurs.
 *
 * - Retourne 200 avec un tableau d’utilisateurs.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} req - Requête Express (non utilisée dans cette opération)
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Tableau d’utilisateurs ou message d’erreur
 */

exports.getList = async (req, res, next) => {
    try {
        let users = await User.find();

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * Récupère un utilisateur à partir de son adresse email.
 *
 * La fonction recherche dans la base de données un utilisateur correspondant à l’email fourni dans les paramètres d’URL.
 * - Si un utilisateur correspondant est trouvé, il est renvoyé avec un statut 200.
 * - Si aucun utilisateur ne correspond à l’email fourni, une erreur 404 est renvoyée.
 * - En cas d’erreur interne (ex : problème MongoDB), une erreur 500 est renvoyée.
 *
 * @param {Object} req - Requête Express contenant l’adresse email dans `req.params.email`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} L’utilisateur trouvé ou un message d’erreur
 */

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

/**
 * Ajoute un nouvel utilisateur.
 *
 * La fonction crée un utilisateur à partir des informations fournies dans le corps de la requête (`username`, `email`, `password`).  
 * - Retourne 201 avec l’utilisateur créé si l’opération réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB, données invalides).
 *
 * @param {Object} req - Requête Express contenant les informations de l’utilisateur dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} L’utilisateur créé ou un message d’erreur
 */

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

/**
 * Modifier un utilisateur à partir de son adresse email.
 *
 * La fonction commence par rechercher l’utilisateur correspondant à l’email fourni dans les paramètres d’URL.
 * - Si aucun utilisateur ne correspond, une erreur 404 est renvoyée.
 * - Si l’utilisateur existe, mise à jour partielle des champs avec `req.body`puis les informations de l'utilisateur sont sauvegardées.
 * - Retourne 200 avec le message `update_ok` si la mise à jour réussit.
 * - Retourne 404 si l’utilisateur n’existe pas.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} req - Requête Express contenant l’email de l’utilisateur dans `req.params.email` et les champs à modifier dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */
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

/**
 * Supprime un utilisateur à partir de son adresse email.
 *
 * La fonction supprime l’utilisateur correspondant à l’email fourni dans les paramètres d’URL.
 * - Retourne 200 avec le message `delete_ok` lorsque l’opération réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème de connexion à la base).
 *
 * @param {Object} req - Requête Express contenant l’adresse email dans `req.params.email`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */
exports.delete = async (req, res) => {
    const email = req.params.email
    
    try{
        await User.deleteOne({email: email});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Authentifie un utilisateur à partir de son email et de son mot de passe.
 *
 * La fonction commence par rechercher un utilisateur correspondant à l’email fourni dans le corps de la requête.  
 * - Si aucun utilisateur ne correspond, une erreur 404 est renvoyée.
 * - Si l’utilisateur existe, le mot de passe fourni est comparé au mot de passe hashé stocké en base avec `bcrypt.compare`.
 * - Si les identifiants sont incorrects, une erreur 403 est renvoyée.
 * - Si les identifiants sont valides, un token JWT valable 24 heures est généré.
 * - Avant de renvoyer la réponse, le mot de passe est retiré des données utilisateur pour ne pas être exposé
 * - Retourne 200 avec un message de succès, le token JWT et les données utilisateur si tout est bon
 * - Retourne 403 si le mot de passe est incorrect.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB, erreur bcrypt).
 *
 * @param {Object} req - Requête Express contenant `email` et `password` dans `req.body`
 * @param {Object} res - Réponse Express permettant de renvoyer le token ou un message d’erreur
 * @returns {Promise<Object>} Données d’authentification ou message d’erreur
 */
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