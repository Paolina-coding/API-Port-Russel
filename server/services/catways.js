const Catway = require('../models/catway');

/**
 * Récupère la liste de tous les catways.
 *
 * Cette fonction interroge la base de données pour retourner tous les catways existants.
 * Si aucun catway n’est trouvé, la fonction renvoie simplement un tableau vide.
 * En cas d’erreur interne (ex : problème de connexion à MongoDB), une erreur 500 est renvoyée.
 *
 * @param {Object} res - Réponse Express permettant d’envoyer les données au client
 * @returns {Promise<Object>} Un tableau de catways ou un message d’erreur
 */

exports.getList = async (req, res, next) => {
    try {
        let catway = await Catway.find();

        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/**
 * Récupère un catway à partir de son numéro.
 *
 * Vérifie d’abord si un catway correspondant au numéro fourni existe.
 * - Retourne 200 avec le catway si trouvé.
 * - Retourne 404 si aucun catway ne correspond.
 * En cas d’erreur interne (ex : problème MongoDB), renvoie une erreur 500.
 *
 * @param {Object} req - Requête Express contenant `id` dans les paramètres d’URL
 * @param {Object} res - Réponse Express
 * @returns {Promise<Object>} Le catway trouvé ou un message d’erreur
 */

exports.getById = async (req, res) => {
    const catwayNumber = req.params.id

    try{
        let catway = await Catway.findOne({catwayNumber : catwayNumber});

        if (catway) {
            return res.status(200).json(catway);
        }
        return res.status(404).json('catway_not_found');
    } catch(error) {
        return res.status(500).json(error);
    }
}

/**
 * Ajoute un nouveau catway.
 *
 * - Retourne 201 et le catway créé si l’opération réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB, données invalides).
 *
 * @param {Object} req - Requête Express contenant les informations du catway dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Le catway créé ou un message d’erreur
 */
exports.add = async (req, res) => {
    const temp = ({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try{
        let catway = await Catway.create(temp);
        
        return res.status(201).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Modifie un catway existant.
 *
 * La fonction recherche d’abord le catway correspondant au numéro fourni dans l’URL.
 * - Si le catway n’existe pas, elle renvoie une erreur 404.
 * - Si le catway existe, mise à jour partielle dans `req.body` (car pas tous les champs sont obligatoires). Puis le catway est sauvegardé en base de données.
 * - Retourne 200 si la mise à jour réussit.
 * - Retourne 500 en cas d’erreur interne (ex : problème MongoDB).
 *
 * @param {Object} req - Requête Express contenant l’identifiant du catway dans `req.params.id` et les champs à modifier dans `req.body`
 * @param {Object} res - Réponse Express 
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */
exports.update = async (req, res) => {
    const catwayNumber = req.params.id;
    const temp = ({
        catwayNumber : req.body.catwayNumber,
        catwayType : req.body.catwayType,
        catwayState: req.body.catwayState
    });

    try{
        let catway = await Catway.findOne({catwayNumber : catwayNumber});
        if (catway) {
            Object.keys(temp).forEach((key) => {
                if (!!temp[key]) {
                    catway[key] = temp[key];
                }
            });

            await catway.save();
            return res.status(200).json('update_ok');
        }
        else {
            return res.status(404).json('catway_not_found');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

/**
 * Supprime un catway à partir de son numéro.
 *
 * Comportement :
 * - Retourne 200 avec le message `delete_ok` lorsque l’opération réussit
 * - Retourne 500 en cas d’erreur interne (ex : problème de connexion à la base de données).
 *
 * @param {Object} req - Requête Express contenant l’identifiant du catway dans `req.params.id`
 * @param {Object} res - Réponse Express
 * @returns {Promise<Object>} Message de confirmation ou message d’erreur
 */

exports.delete = async (req, res) => {
    const catwayNumber = req.params.id
    
    try{
        await Catway.deleteOne({catwayNumber : catwayNumber});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}