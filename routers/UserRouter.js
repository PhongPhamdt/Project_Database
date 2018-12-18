const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const connectionString = 'postgres://txscvdqw:GOIvHfhME7n90yjjngUHGOogp-3FZI64@baasu.db.elephantsql.com:5432/txscvdqw';
const parse = require('pg-connection-string').parse;
const config = parse(connectionString);
const pool = new pg.Pool(config);

UserRouter.post('/', (req,res) => {
    const {username, password} = req.body || {};
    pool.connect((err, client) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`INSERT INTO "user" VALUES()`, (err,result) => {
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result});
                client.end();
            });
        }
        pool.end();
    });
});

//R
UserRouter.get('/', (req,res) => {
    

    UserModel.find({}, {password: 0}, (err, users) => {
        if(err) res.status(500).json({ success: 0, error: err });
        else res.json({ success: 1, user: users });
    });
});
//BTVN finish UD and getById
UserRouter.get('/:id', (req, res) => {
    UserModel.findOne({ _id: req.params.id }, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, error: err })
        else res.status(200).json({ success: 1, user: userFound })
    })
})

UserRouter.put('/:id', (req, res) => {
    const {password, name} = req.body || {};
    const userId = req.params.id;
    UserModel.findById(
        userId,
        (err, userFound) => {
            if (err) res.status(500).json({ success: 0, error: err });
            else if(!userFound) res.status(404).json({ success: 0, error: "No such user"});
            else {
                const userChange = {password, name};
                for(key in userChange) {
                    if(userChange[key] !== null && userChange[key] !== undefined)
                        userFound[key] = userChange[key];
                }
                userFound.save((err, userUpdated) =>{
                    if (err) res.status(500).json({ success: 0, error: err });
                    else res.send({ success: 1, user: userUpdated });
                });
            }
        });
});

UserRouter.delete('/:id', (req,res) => {
    UserModel.findByIdAndRemove({ _id: req.params.id }).then(userDeleted=>{
        res.status(200).json({ success: 1, user: userDeleted })
    });
});



module.exports = UserRouter;