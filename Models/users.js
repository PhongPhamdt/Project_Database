const pg = require('pg');
const parse = require('pg-connection-string').parse;
const connectionString = 'postgres://rneegkxf:uD0U7ZZjRDYPnKXmKdz4_GPRs8CWzsrR@baasu.db.elephantsql.com:5432/rneegkxf';
const config = parse(connectionString);

let pool = new pg.Pool(config);

pool.connect((err,client,done) => {
    if (err) console.log(err);
    else{
        client.query(``, (err,result) => {
            if(err) console.log(err);
            else{
                console.log(result.rows);
            }
        });
    }
});