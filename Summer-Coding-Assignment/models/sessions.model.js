const mongoose = require('mongoose');
const { ObjectID } = require('bson');

// create a mongoose schema for a session
const SessionSchema = mongoose.Schema({
  

    date: Date, 
    session_time:String,
    client: ObjectID,
    physiotherapist:ObjectID,
    fee:String,
    session_number:Number,
attendance_duration:String,
type:String,
session_notes:String,


 



},);
// export the model to our app
module.exports = mongoose.model('Sessions', SessionSchema); 