const express = require('express');
const LikeRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

LikeRouter.post('/like_image/:id/:iid', (req,res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    // const {content} = req.body;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`INSERT INTO "like"("imageid","userId") 
                            VALUES('${imageId}','${userId}');`, (err,result) => {
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
LikeRouter.get('/get_all_likes_of_an_image/:iid', (req,res) => {
    const imageId = req.params.iid;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "like"
                            WHERE ("imageid"=${imageId});`, (err,result) => {
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
LikeRouter.get('/get_all_likes_of_user/:id', (req, res) => {
    const userId = req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "like"
                            WHERE ("userId"=${userId});`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else res.status(201).json({ success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});

// LikeRouter.put('/:id', (req, res) => {
//     const {password} = req.body || {};
//     const userId = req.params.id;
//     if(password) {
//         pool.connect((err, client, done) => {
//             if (err) res.status(500).json({success: 0, error: err});
//             else {
//                 client.query(`UPDATE "user" set password = '${password}' WHERE ("userId" = ${userId})`, (err, result) => {
//                     done();
//                     if (err) res.status(500).json({success: 2, error: err});
//                     else res.status(201).json({success: 1, user: result});
//                     // client.end();
//                 });
//             }
//         });
//     }
// });

// LikeRouter.put('/profile/:id', (req, res) => {
//     const {name,avatarUrl,gender} = req.body || {};
//     const userId = req.params.id;
//     if (name||avatarUrl||gender) {
//         pool.connect((err, client, done) => {
//             if (err) res.status(500).json({success: 0, error: err});
//             else {
//                 client.query(`UPDATE "user" set name = '${name}',
//                                 "avatarUrl" = '${avatarUrl}',
//                                 gender = '${gender}'
//                                 WHERE ("userId" = ${userId})`, (err, result) => {
//                     done();
//                     if (err) res.status(500).json({success: 2, error: err});
//                     else res.status(201).json({success: 1, user: result.rows});
//                     // client.end();
//                 });
//             }
//         });
//     }
// });


LikeRouter.delete('/dislike/:id/:iid', (req,res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`DELETE FROM "like" WHERE ("userId"=${userId}
                                                    AND "imageid"=${imageId});`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});

module.exports = LikeRouter;