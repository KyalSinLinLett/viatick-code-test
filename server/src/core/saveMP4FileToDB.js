const GPSPoint = require("../models/gpsPoints");
const MP4File = require("../models/mp4File");
const sequealize = require("../database/database");
const extract = require("../core/extract");

MP4File.hasMany(GPSPoint);

module.exports = (filename, path) => {
    const records = extract(path);

    sequealize
        .sync()
        .then((result) => {
            console.log(result);
            return MP4File.create({ filename: filename, path: path });
        })
        .then((mp4File) => {
            console.log(mp4File);

            // return mp4File.createGpsPointBulk(records);
            // GPSPoint.
            return GPSPoint.bulkCreate(
                records.map((r) => {
                    return { ...r, mp4FileId: mp4File.id };
                })
            );
        })
        .catch((err) => {
            console.log(err);
        });
};
