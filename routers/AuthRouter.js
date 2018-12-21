const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const config = require('./config');
const pool = new pg.Pool(config);

AuthRouter.post('/login', (req,res) => {
    const { username, password } = req.body;
    pool.connect((err, client, done) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "user"
                            WHERE "username" = '${username}'`, (err,result) => {
                done();
                if (err) res.status(500).json({ success: 2, error: err});
                else if(!result.rows[0]) res.status(404).json({ success: 3, error: "User not found"});
                else {
                    // console.log(result.rows);
                    if (password === result.rows[0].password) {
                        req.session.user = {userId: result.rows[0].userId};
                        res.json({success: 1, message: "Login Successful"});
                    } else res.status(401).json({ success: 0, error: "Wrong password"});
                }
                // client.end();
            });
        }
        // pool.end();
    });

    // UserSchema.findOne({ username }, (err, userFound) => {
    //     if(err) res.status(500).json({ success: 0, error: err});
    //     else if(!userFound) res.status(404).json({ success: 0, error: "User not found"});
    //     else{
    //         if(bcrypt.compareSync(password, userFound.password)) {
    //             req.session.user = { userId: userFound._id };
    //             res.json({ success: 1, message: "Login successful", redirect: `https://keepwarmbaby.herokuapp.com/main.html?id=${userFound._id}`||`http://localhost:8080/main?id=${userFound._id}`});
    //             // `http://keepwarmbaby.herokuapp.com/main.html?id=${userFound._id}`||
    //             console.log(userFound._id);
    //         } else res.status(401).json({ success: 0, error: "Wrong password"});
    //     }
    // });
    // mailer.transporter();
});

AuthRouter.delete('/logout', (req,res) => {
    req.session.destroy();
    pool.end();
    res.send({ success: 1, message:"Logout successfully"});
    // pool.end();
});

module.exports = AuthRouter;