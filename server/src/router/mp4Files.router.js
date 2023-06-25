const router = require("express").Router();
const MP4File = require("../models/mp4File");
const sequelize = require("../database/database");

router.get("/", (req, res, next) => {
    try {
        sequelize
            .sync()
            .then((result) => {
                console.log(result);
                return MP4File.findAll();
            })
            .then((mp4Files) => {
                console.log(mp4Files);
                return res.send({
                    status: "success",
                    message: "mp4 files fetched sucessfully",
                    data: mp4Files,
                });
            });
    } catch (error) {
        return res.status(400).send({
            status: "fail",
            message: "mp4 files failed to fetch",
            error: error.message,
        });
    }
});

module.exports = router;
