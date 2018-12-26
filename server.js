const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");

const cors = require('cors');
const apiRouter = require('./routers/apiRouter');

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

const port = process.env.port || 6969;

app.listen(port, err => {
    if (err) console.log(err);
    console.log("Server started at port " + port);
});

