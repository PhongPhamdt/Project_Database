const connectionString = 'postgres://txscvdqw:tU0QoRhdKP_X1D6zekT1QZZJOI6ghJS2@baasu.db.elephantsql.com:5432/txscvdqw';
const parse = require('pg-connection-string').parse;
const config = parse(connectionString);

module.exports = config;
