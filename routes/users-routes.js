const express = require('express');
const router = express.Router();

const UserModel = require('../models/UserModel.js');

// http://localhost:3001/users/registration
router.post('/registration',
    function(req, res) {
        
        let newDocument = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": req.body.password
        };

        UserModel
        .create(newDocument)
        // If MongoDB creates document succesfully, then...
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        // Otherwise, if error occurs catch it...
        .catch(
            function(error) {
                console.log('/registration error', error);

                res.send('An error occured');
            }
        );
    }
);

// http://localhost:3001/users/find
router.post('/find',
    function(req, res) {
        UserModel
        .find(
           // { "firstName": req.body.firstName }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {

                console.log('/find error', error);

                res.send('An error occured');

            }
        )
    }
);


// http://localhost:3001/users/update
router.put(
    '/update',
    function(req, res) {

        let updates = {}

        if (req.body.firstName){ 
            updates['firstName'] = req.body.firstName 
        };
        if (req.body.lastName) {
            updates['lastName'] = req.body.lastName;
        };
        if (req.body.phone) {
            updates['phone'] = req.body.phone;
        };

        UserModel
        .findOneAndUpdate(
            {
                "email": req.body.email
            },
            {
                $set: updates
            },
            {
                new: true
            }
        )
        .then(
            function(dbDocument) {
                res.json(dbDocument)
            }
        )
        .catch(
            function(error) {
                console.log('/users/update error', error);
                res.send('An error occured');
            }
        )

    }
);

module.exports = router;