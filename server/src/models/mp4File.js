const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const MP4File = sequelize.define("mp4File", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    filename: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = MP4File;
