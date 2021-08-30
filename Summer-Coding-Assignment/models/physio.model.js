const mongoose = require('mongoose');


// create a mongoose schema for a physiotherapist
const PhysioSchema = mongoose.Schema({
  

    title: String,
    first_name:String,
    surname:String,
    mobile:String,
    home_phone:String,
    email:String,

address:Object,
address_line1:String,
address_line2:String,
town:String,
county:String,
eircode:String,

 



},);
// export the model to our app
module.exports = mongoose.model('Physios', PhysioSchema); 