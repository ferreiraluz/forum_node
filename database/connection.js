const Sequelize = require("sequelize");
const connection = new Sequelize("forum", "root", "1504", {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;