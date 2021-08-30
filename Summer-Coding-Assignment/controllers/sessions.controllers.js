const Sessions = require('../models/sessions.model.js');


exports.create = (req, res) => {
    // Validates the request
    if(!req.body.date|| !req.body.session_time || !req.body.session_number || !req.body.client || !req.body.physiotherapist
        || !req.body.fee || !req.body.attendance_duration || !req.body.type ||!req.body.session_notes 
        ) {
        return res.status(400).send({
            message: "Session information must be realised fully!"
        });
    }

    // Create a new Sessions (using schema)
    const session = new Sessions({
      
       
        date: req.body.date ,
        session_time:req.body.session_time,
        client:req.body.client,
         physiotherapist:req.body.physiotherapist,
         fee:req.body.fee ,
        session_number:req.body.session_number,
         
  
        attendance_duration:req.body.attendance_duration,
        type: req.body.type,
        session_notes:req.body.session_notes,
        
    
        
    });

    // Save Sessions in the database
    session.save()
    .then(data => {
        console.log("\nNew Session added to database \n"+data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the session."
        });
    });
};



// Return all Sessions in the database
exports.findAll = (req, res) => {
    Sessions.find()
    .then(sessions => {
      
        console.log(sessions);
       res.render('sessions_view',{
           
            results: sessions
          });
   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Sessionss."
        });
    });
};

// Find a single Session identified by sessionsId
exports.findOne = (req, res) => {
    
    var search = req.params.type;
    console.log("Searching Session: "+search)
    Sessions.find({ type: new RegExp(search,"ig")})
    .then(sessions => {
        res.render('sessions_view',{
            results: sessions
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving client."
        });
    });
};

// Update a Session identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "update content cannot be empty"
        });
    }

    // Find the Session and update it with the request body
    Sessions.findByIdAndUpdate({"_id":req.params.sessionId}, {"$set":{
     
        "date": req.body.date,
        "session_time": req.body.session_time,
        "client": req.body.client,
       "physiotherapist": req.body.physiotherapist,
       "session_number": req.body.session_number, 
      "fee": req.body.fee,
      "attendance_duration": req.body.attendance_duration,
        "type": req.body.type,
        "session_notes": req.body.session_notes,
       
            
    }
    },    
       { new: true, omitUndefined: true})       
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });
        }
        console.log("\nSession updated with id"+ req.params.sessionId +" updated details below\n"+ session);
        res.send(session);
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Error updating Session with id " + req.params.sessionId
        });
    });
};

// Delete a Session identified by SessionsId
exports.delete = (req, res) => {
   Sessions.findByIdAndRemove(req.params.sessionId)
    .then(session => {
        if(!session) {
            return res.status(404).send({
                message: "Physio not found with id " + req.params.sessionId
            });
        }
        console.log("\nSession with id "+ req.params.sessionId+ " deleted successfully!")
        res.send({message: "Session with id "+ req.params.sessionId+ " deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Session not found with id " + req.params.sessionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Session with id " + req.params.sessionId
        });
    });
};