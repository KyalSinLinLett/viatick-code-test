const router = require("express").Router();
const GPSPoint = require("../models/gpsPoints");
const sequelize = require("../database/database");
const _ = require("lodash");

router.post("/", (req, res, next) => {
    const { mp4FileId } = req.body;
    try {
        sequelize
            .sync()
            .then((result) => {
                console.log(result);
                return GPSPoint.findAll({ where: { mp4FileId: mp4FileId } });
            })
            .then((gpsPoints) => {
                const len = gpsPoints.length;
                gpsPoints = gpsPoints.splice(1, gpsPoints.length);
                return res.send({
                    status: "success",
                    message: "gps points fetched sucessfully",
                    length: gpsPoints && gpsPoints.length,
                    data: gpsPoints,
                });
            });
    } catch (error) {
        return res.status(400).send({
            status: "fail",
            message: "gps points failed to fetch",
            error: error.message,
        });
    }
});

module.exports = router;
