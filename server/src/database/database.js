const Sequelize = require("sequelize");
const sequealize = new Sequelize("viatick-db", "user", "password", {
    dialect: "mysql",
    host: "172.19.0.2",
});

module.exports = sequealize;
