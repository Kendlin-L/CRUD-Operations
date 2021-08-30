const { ObjectID } = require('bson');
const mongoose = require('mongoose');


// create a mongoose schema for a client
const ClientSchema = mongoose.Schema({
  

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

 add_info: Object,
 birthdate: String,
parent_guardian:String,
leave_message:Boolean,
registerd:Date,
doctor: String,
reffered_by:String,
 



},);
// export the model to our app
module.exports = mongoose.model('Clients', ClientSchema); 