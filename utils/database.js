const Sequelize = require('sequelize');
const config = require('../config/config');

const configDB = config['development'];
const { username, password, database, host, dialect } = configDB;
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

module.exports = sequelize;