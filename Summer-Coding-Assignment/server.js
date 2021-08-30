const express = require('express');      


const app = express();     
const hbs = require('hbs');
const path = require('path');  


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('views',path.join(__dirname,'views'));
app.use(express.static('views/SVGs'));               // set the views directory
app.set('view engine', 'hbs');  
const dbConnect = require('./db-connect.js');

const mongoose = require('mongoose');




mongoose.connect(dbConnect.database.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB database");    
}).catch(err => {
    console.log('Unable to connect to the MongoDB database', err);
    process.exit();
});


require('./routes/root.routes.js')(app);
require('./routes/clients.routes.js')(app);
require('./routes/physio.routes.js')(app);
require('./routes/sessions.routes.js')(app);


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


/////////////////////////////////RESOURCES USED ///////////////////////////////////////
  /*

  -Database design  https://docs.mongodb.com/manual/ database modelling section
  */

    /////////////////////////////////Database Design ///////////////////////////////////////
  /*
      For this assignment I decided to use a hybrid of both de-normalised and normalised database concepts as
      I thought it would allow for better and less laborious querying. 
      
  */




