const environment = process.env.NOD_ENV || 'development';
const config = require('../knexfile')[environment];
module.exports = require('knex')(config);
