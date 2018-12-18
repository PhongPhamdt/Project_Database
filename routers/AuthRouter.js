const express = require('express');
const AuthRouter = express.Router();
const bcrypt = require('bcrypt-nodejs');
const pg = require('pg');
const connectionString = 'postgres://txscvdqw:GOIvHfhME7n90yjjngUHGOogp-3FZI64@baasu.db.elephantsql.com:5432/txscvdqw';
const parse = require('pg-connection-string').parse;
const config = parse(connectionString);
const pool = new pg.Pool(config);

AuthRouter.post('/login', (req,res) => {
    const { username, password } = req.body;
    pool.connect((err, client) => {
        if (err) res.status(500).json({ success: 0, error: err});
        else {
            client.query(`SELECT * FROM "user"
                            WHERE "username" = '${username}'`, (err,result) => {
                if (err) res.status(500).json({ success: 2, error: err});
                else if(!result) res.status(404).json({ success: 3, error: "User not found"});
                else {
                    if (password === result.rows[0].password) {
                        req.session.user = {userId: result.rows[0].userId};
                        res.json({success: 1, message: "Login Successful"});
                    } else res.status(401).json({ success: 0, error: "Wrong password"});
                }
                client.end();
            });
        }
        pool.end();
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
    res.send({ success: 1, message:"Logout successfully"});
});

module.exports = AuthRouter;