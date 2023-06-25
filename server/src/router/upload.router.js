const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const saveMP4FileToDB = require("../core/saveMP4FileToDB");

const multerConfigs = {
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./uploads");
        },
        filename: function (req, file, cb) {
            const fileExt = path.extname(file.originalname);
            const fileName = path.parse(file.originalname).name;
            let ffile = fileName + "_" + Date.now() + fileExt;
            cb(null, ffile);
        },
    }),
    limits: {
        fileSize: 1e9,
    },
};

const upload = multer(multerConfigs).single("video_file");

router.post("/", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).send("SOMETHING WENT WRONG UPLOADING FILE");
        }

        saveMP4FileToDB(req.file.filename, req.file.path);

        const response = {
            ...req.file,
            status: "success",
            message: "file uploaded successfully",
        };

        res.send(response);
    });
});

module.exports = router;
