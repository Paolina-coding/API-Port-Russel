const mongoose = require('mongoose');

const clientOptions = {
    dbName : 'Port-Russel'
};

exports.initClientDbConnection = async () => {
    try{
        await mongoose.connect(process.env.URL_MONGO, clientOptions)
        console.log('Connected');
    } catch (error) {
        console.log(error);
        throw error;
    }
}