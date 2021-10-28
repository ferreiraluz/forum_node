const Sequelize = require("sequelize");
const connection = require("../connection");

const Answer = connection.define("Answer", {
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idQuestion: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Answer.sync({force: false});

module.exports = Answer;