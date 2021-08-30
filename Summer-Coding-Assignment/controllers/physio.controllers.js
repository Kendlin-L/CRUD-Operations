const Physio = require('../models/physio.model.js');

exports.create = (req, res) => {
    // Validates the request From AJAX
    if(!req.body.home_phone|| !req.body.first_name || !req.body.surname || !req.body.mobile || !req.body.email 
        || !req.body.address_line1 || !req.body.town || !req.body.county ||!req.body.eircode 
        ) {
        return res.status(400).send({
            message: "Physio information must be realised fully!"
        });
    }

    // Create a new Physio (using schema)
    const physio = new Physio({
      
       
        title:req.body.title ,
        first_name:req.body.first_name,
        surname:req.body.surname,
        mobile:req.body.mobile,
         home_phone:req.body.home_phone ,
        email:req.body.email,
         
       address:{
        address_line1:req.body.address_line1,
        address_line2: req.body.address_line2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode,
        },
    
        
    });

    // Save Physio in the database
    physio.save()
    .then(data => {
        console.log("\nNew Physiotherapist added to database \n"+data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the physio."
        });
    });
};



// Return all Physios in the database
exports.findAll = (req, res) => {
    Physio.find()
    .then(physio => {
      
        console.log(physio);
       
       res.render('physios_view',{
           
            results: physio
          });
   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Physios."
        });
    });
};

// Find a single Physio identified by physioId
exports.findOne = (req, res) => {
    var search = req.params.email;
    console.log("Searching Physios: "+search)
    Physio.find({ email: new RegExp(search,"ig")})
    .then(physio => {
        res.render('physios_view',{
            results: physio
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving client."
        });
    });
};

// Update a Physio identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "update content cannot be empty"
        });
    }

    // Find the Physio and update it with the request body
    Physio.findByIdAndUpdate({"_id":req.params.physioId}, {"$set":{
     
        "title": req.body.title,
        "first_name": req.body.first_name,
        "surname": req.body.surname,
       "email": req.body.email,
        "mobile": req.body.mobile,
      "address.address_line1": req.body.address_line1,
        "address.address_line2": req.body.address_line2,
        "address.town": req.body.town,
        "address.county": req.body.county,
        "address.eircode": req.body.eircode,
            
    }
    },    
       { new: true, omitUndefined: true})        
    .then(physio => {
        if(!physio) {
            return res.status(404).send({
                message: "Phsiotherapist not found with id " + req.params.physioId
            });
        }
        console.log("\nPhsiotherapist updated with id"+ req.params.physioId +" updated details below\n"+ physio);
        res.send(physio);
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Phsiotherapist not found with id " + req.params.physioId
            });                
        }
        return res.status(500).send({
            message: "Error updating Physiotherapist with id " + req.params.physioId
        });
    });
};

// Delete a Physio identified by PhysioId
exports.delete = (req, res) => {
   Physio.findByIdAndRemove(req.params.physioId)
    .then(physio => {
        if(!physio) {
            return res.status(404).send({
                message: "Physiotherapist not found with id " + req.params.physioId
            });
        }
        console.log("\nPhysiotherapist with id "+ req.params.physioId+ " deleted successfully!")
        res.send({message: "Physiotherapist with id "+ req.params.physioId+ " deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Physiotherapist not found with id " + req.params.physioId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Physiotherapist with id " + req.params.physioId
        });
    });
};