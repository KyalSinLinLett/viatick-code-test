const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const GPSPoint = sequelize.define("gpsPoint", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    hour: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    minute: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    second: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    year: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    month: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    day: {
        type: Sequelize.BIGINT,
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ns_ind: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    ew_ind: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    reservd: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lat: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    lon: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    speed: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
    angle: {
        type: Sequelize.FLOAT,
        allowNull: true,
    },
});

module.exports = GPSPoint;
