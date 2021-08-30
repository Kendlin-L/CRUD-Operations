const Clients = require('../models/clients.model.js');

exports.create = (req, res) => {
    // Validates the request from AJAX call
    if(!req.body.home_phone|| !req.body.first_name || !req.body.surname || !req.body.mobile || !req.body.email 
        || !req.body.address_line1 || !req.body.town || !req.body.county ||!req.body.eircode 
        || !req.body.birth_date || !req.body.parent_guardian || !req.body.leave_message == Boolean ||!req.body.registered ||!req.body.doctor || !req.body.referred_by) {
        return res.status(400).send({
            message: "Client document must be realised fully!"
        });
    }

    // Create a new Client (using schema)
    const client = new Clients({
      
       
        title:req.body.title ,
        first_name:req.body.first_name,
        surname:req.body.surname,
        mobile:req.body.mobile,
        home_phone: req.body.home_phone,
        email:req.body.email,

         
        address:{
        address_line1:req.body.address_line1,
        address_line2:req.body.address_line2,
        town:req.body.town,
        county:req.body.county,
        eircode:req.body.eircode,
        },
    add_info:{
        birth_date: req.body.birth_date,
    parent_guardian: req.body.parent_guardian,
    leave_message: req.body.leave_message,
    registered: new Date(req.body.registered),
    doctor: req.body.doctor,
    referred_by: req.body.referred_by
    }
    });

    // Save Client in the database
    client.save()
    .then(data => {
        console.log("\nNew client added to database \n"+data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while creating the Client."
        });
    });
};



// Return all Clients in the database
exports.findAll = (req, res) => {
    Clients.find()
    .then(clients => {
      
        console.log(clients);
       res.render('clients_view',{
           
            results: clients
          });
   
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving all Quotations."
        });
    });
};

// Find a single Client identified by email from search params
exports.findOne = (req, res) => {
    var search = req.params.email;
    console.log("Searching Clients: "+search)
    Clients.find({ email: new RegExp(search,"ig")})
    .then(clients => {
        res.render('clients_view',{
            results: clients
          });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving client."
        });
    });
};

// Update a Client identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "update content cannot be empty"
        });
    }

    // Find the Client and update it with the request body
    Clients.findByIdAndUpdate({"_id":req.params.clientId}, {"$set":{
        
        "title": req.body.title,
        "first_name": req.body.first_name,
        "surname": req.body.surname,
       "email": req.body.email,
        "mobile": req.body.mobile,
        "home_phone": req.body.home_phone,
      "address.address_line1": req.body.address_line1,
        "address.address_line2": req.body.address_line2,
        "address.town": req.body.town,
        "address.county": req.body.county,
        "address.eircode": req.body.eircode,
            "add_info.birth_date":req.body.birth_date,
            "add_info.parent_guardian":req.body.parent_guardian,
            "add_info.leave_message":req.body.leave_message,
            "add_info.registered":req.body.registerd,
            "add_info.doctor":req.body.doctor,
              "add_info.reffered_by":req.body.reffered_by,

              //dot syntax is used to access subdocs
    }
    },    
       { new: true, omitUndefined: true})       
    .then(client => {
       
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        console.log("\nClient updated with id"+ req.params.clientId +" updated details below\n"+ client);
        res.send(client);
       
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error updating Client with id " + req.params.clientId
        });
    });
};

// Delete a Client identified by clientId
exports.delete = (req, res) => {
   Clients.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        console.log("\nClient with id "+ req.params.clientId+ " deleted successfully!")
        res.send({message: "Client with id "+ req.params.clientId+ " deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Client with id " + req.params.clientId
        });
    });
};

