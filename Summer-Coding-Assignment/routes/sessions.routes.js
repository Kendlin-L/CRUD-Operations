module.exports = (app) => {


    //functions for routese are handled in controller below
    const session = require('../controllers/sessions.controllers.js');

    // Creates a new Session
    app.post('/sessions', session.create);
   

    // Retrieve all Sessions
    app.get('/sessions', session.findAll);

    // // Retrieve a single Session specified by sessionId
    app.get('/sessions/:type', session.findOne);

    // Update a Session specified by sessionId
    app.put('/sessions/:sessionId', session.update);

    // // Delete a Session specified by sessionId
    app.delete('/sessions/:sessionId', session.delete);
}