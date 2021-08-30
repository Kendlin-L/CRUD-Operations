module.exports = (app) => {

const route = require('../controllers/route.controller.js');
app.get('/', route.root)
}