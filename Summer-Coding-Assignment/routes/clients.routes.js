module.exports = (app) => {


 //functions for routese are handled in controller below
    const clients = require('../controllers/clients.controllers.js');
   

   

    // Create a new Client
    app.post('/clients', clients.create);
   

    // Retrieve all Clients
    app.get('/clients', clients.findAll);

    // Retrieve Client from database
    //handle by search bar in UI
    app.get('/clients/:email', clients.findOne);

    // Update a Client specified by clientId
    app.put('/clients/:clientId', clients.update);

    // // Delete a Client specified by clientId
    app.delete('/clients/:clientId', clients.delete);
}