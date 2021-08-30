module.exports = (app) => {

        //functions for routese are handled in controller below
    const physio = require('../controllers/physio.controllers.js');
   
    // Create a new Physio
    app.post('/physio', physio.create);
   

    // Retrieve all Physios
    app.get('/physio', physio.findAll);

    // // Retrieve a single Physio specified by physioId
    //handle by search bar in Physio Ui
    app.get('/physio/:email', physio.findOne);

    // Update a physio specified by physioId
    app.put('/physio/:physioId', physio.update);

    // // Delete a physio specified by physioId
    app.delete('/physio/:physioId', physio.delete);
}