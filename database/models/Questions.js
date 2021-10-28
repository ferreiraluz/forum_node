const Sequelize = require("sequelize");
const connection = require("../connection");

const Questions = connection.define("Questions", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Questions.sync({force: false});

module.exports = Questions;