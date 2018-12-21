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
                // client.end();
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
                // client.end();
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
                // client.end();
            });
        }
        // pool.end();
    });
});

UserRouter.put('/:id/password', (req, res) => {
    const {password} = req.body || {};
    const userId = req.params.id;

    if(password) {
        pool.connect((err, client, done) => {
            if (err) res.status(500).json({success: 0, error: err});
            else {
                client.query(`UPDATE "user" set password = '${password}' WHERE ("userId" = ${userId})`, (err, result) => {
                    done();
                    if (err) res.status(500).json({success: 2, error: err});
                    else res.status(201).json({success: 1, user: result});
                    // client.end();
                });
            }
        });
    }
});

UserRouter.put('/:id/profile', (req, res) => {
    const {name,avatarUrl,gender} = req.body || {};
    const userId = req.params.id;
    if (name||avatarUrl||gender) {
        pool.connect((err, client, done) => {
            if (err) res.status(500).json({success: 0, error: err});
            else {
                client.query(`UPDATE "user" set name = '${name}', 
                                "avatarUrl" = '${avatarUrl}',
                                gender = '${gender}' 
                                WHERE ("userId" = ${userId})`, (err, result) => {
                    done();
                    if (err) res.status(500).json({success: 2, error: err});
                    else res.status(201).json({success: 1, user: result.rows});
                    // client.end();
                });
            }
        });
    };
});


UserRouter.delete('/:id', (req,res) => {
    const userId = req.params.id;

    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`DELETE FROM "user" WHERE ("userId"=${userId})`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
    // UserModel.findByIdAndRemove({ _id: req.params.id }).then(userDeleted=>{
    //     res.status(200).json({ success: 1, user: userDeleted })
    // });
});



module.exports = UserRouter;