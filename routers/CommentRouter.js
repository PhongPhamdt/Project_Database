const express = require('express');
const CommentRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

CommentRouter.post('/post_comment/:id/:iid', (req,res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    const content = req.body;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`INSERT INTO "comment"("imageId","userId",content) 
                            VALUES('${imageId}','${userId}','${content}');`, (err,result) => {
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
CommentRouter.get('/get_all_comments_of_an_image/', (req,res) => {
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
CommentRouter.get('/:id', (req, res) => {
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

CommentRouter.put('/password/:id', (req, res) => {
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

CommentRouter.put('/profile/:id', (req, res) => {
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
    }
});


CommentRouter.delete('/:id', (req,res) => {
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
});

module.exports = CommentRouter;