import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

export default upload;