const express = require('express');
const ImageRouter = express.Router();
const pg = require('pg');
const formidable = require('formidable');
const config = require('./config');
const pool = new pg.Pool(config);

ImageRouter.post('/upload_image/:id', (req, res) => {
    // const {rep, title, description} = req.body || {};
    const userId = req.params.id;
    const form = new formidable.IncomingForm();
    form
        .addListener('error', (err) => {
            throw (err);
        })
        .parse(req)
        .on('fileBegin', function (name, file) {
            file.path = __dirname + '/uploads/' + file.name;
        })
        .on('file', (name, file) => {
            file.path = '/uploads/' + file.name;
            pool.connect((err, client, done) => {
                if (err) res.status(500).json({success: 0, error: err});
                else {
                    client.query(`INSERT INTO "image"("imageUrl","userId")
                            VALUES('${file.path}','${userId}');`, (err, result) => {
                        done();
                        if (err) res.status(500).json({success: 2, error: err});
                        else res.status(201).json({success: 1, user: result});
                        // client.end();
                    });
                }
            });
        });
});
ImageRouter.post('/post_image_content/:id/:iid', (req, res) => {
    const {title, description} = req.body || {};
    const userId = req.params.id;
    const imageId = req.params.iid;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`INSERT INTO "image"("description","title")
                            VALUES('${description}','${title}')
                            WHERE ("userId"=${userId} AND "imageId"=${imageId});`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result});
                // client.end();
            });
        }
    });
});

//R
ImageRouter.get('/get_all_images/:id', (req, res) => {
    const userId = req.params.id;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`SELECT * FROM "image"
                            WHERE "userId"='${userId}';`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});
//BTVN finish UD and getById
ImageRouter.get('/get_image_by_id/:id/:iid', (req, res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`SELECT * FROM "image"
                            WHERE ("userId" = '${userId}'
                                    AND "imageId" = '${imageId}');`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});

ImageRouter.put('/update_image_by_id/:id/:iid', (req, res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    const {title, description} = req.body;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`UPDATE "image" set title = '${title}',
                            description = '${description}'
                            WHERE ("userId" = ${userId}
                                    AND "imageId" = ${imageId});`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result});
                // client.end();
            });
        }
    });
});

ImageRouter.delete('/delete_image_by_id/:id/:iid', (req, res) => {
    const userId = req.params.id;
    const imageId = req.params.iid;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({success: 0, error: err});
        else {
            client.query(`DELETE FROM "image" WHERE ("userId"=${userId}
                                                        AND "imageId"=${imageId});`, (err, result) => {
                done();
                if (err) res.status(500).json({success: 2, error: err});
                else res.status(201).json({success: 1, user: result.rows});
                // client.end();
            });
        }
        // pool.end();
    });
});

module.exports = ImageRouter;