const connectionString = 'postgres://txscvdqw:GOIvHfhME7n90yjjngUHGOogp-3FZI64@baasu.db.elephantsql.com:5432/txscvdqw';
const parse = require('pg-connection-string').parse;
const config = parse(connectionString);

module.exports = config;
