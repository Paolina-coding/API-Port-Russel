const Catway = require('../models/catway');

/* Récupérer la liste des catways */
exports.getList = async (req, res, next) => {
    try {
        let catway = await Catway.find();

        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json(error);
    }
};

/* Récuperer un catway avec son identifiant*/
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

/* Ajouter un catway */
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

/* Modifier un catway */
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

/* Supprimer un catway */
exports.delete = async (req, res) => {
    const catwayNumber = req.params.id
    
    try{
        await Catway.deleteOne({catwayNumber : catwayNumber});
        return res.status(200).json('delete_ok');
    } catch (error) {
        return res.status(500).json(error);
    }
}