const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");
// const pg = require('pg');
const cors = require('cors');
const apiRouter = require('./routers/apiRouter');
// const parse = require('pg-connection-string').parse;
// const connectionString = 'postgres://txscvdqw:GOIvHfhME7n90yjjngUHGOogp-3FZI64@baasu.db.elephantsql.com:5432/txscvdqw';
// const config = parse(connectionString);
// const pool = new pg.Pool(config);

let app = express();

app.use(session({
    secret: 'roseislalala',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));
app.use(cors());
app.use('/api', apiRouter);

// pool.connect((err, client) => {
//     if (err) console.log(err);
//     else {
//         client.query(`SELECT * from "User"`, (err,result) => {
//             if (err) console(err);
//             else {
//                 console.log(result.rows[0]);
//             }
//         });
//     }
// });

const port = process.env.port || 6969;

app.listen(port, err => {
    if (err) console.log(err);
    console.log("Server started at port " + port);
});

