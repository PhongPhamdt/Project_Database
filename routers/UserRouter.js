const express = require('express');
const UserRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

UserRouter.post('/', (req,res) => {
    const {username, password, name, avatarUrl, gender} = req.body || {};
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`INSERT INTO "user"(username,password,name,"avatarUrl",gender) 
                            VALUES('${username}','${password}','${name}','${avatarUrl}','${gender}');`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result});
                client.end();
            });
        }
        // pool.end();
    });
});

//R
UserRouter.get('/', (req,res) => {
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "user"`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result.rows});
                client.end();
            });
        }
        // pool.end();
    });
});
//BTVN finish UD and getById
UserRouter.get('/:id', (req, res) => {
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "user"
                            WHERE "userId" = ${req.params.id}`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result.rows});
                client.end();
            });
        }
        // pool.end();
    });
});

UserRouter.put('/:id', (req, res) => {
    const {password, name, avatarUrl, gender} = req.body || {};
    const userId = req.params.id;

    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(``, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result.rows});
                client.end();
            });
        }
        // pool.end();
    });
    // UserModel.findById(
    //     userId,
    //     (err, userFound) => {
    //         if (err) res.status(500).json({ success: 0, error: err });
    //         else if(!userFound) res.status(404).json({ success: 0, error: "No such user"});
    //         else {
    //             const userChange = {password, name};
    //             for(key in userChange) {
    //                 if(userChange[key] !== null && userChange[key] !== undefined)
    //                     userFound[key] = userChange[key];
    //             }
    //             userFound.save((err, userUpdated) =>{
    //                 if (err) res.status(500).json({ success: 0, error: err });
    //                 else res.send({ success: 1, user: userUpdated });
    //             });
    //         }
    //     });
});

UserRouter.delete('/:id', (req,res) => {
    UserModel.findByIdAndRemove({ _id: req.params.id }).then(userDeleted=>{
        res.status(200).json({ success: 1, user: userDeleted })
    });
});



module.exports = UserRouter;