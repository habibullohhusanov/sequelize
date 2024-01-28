import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "./public/images/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const checkFileType = (file, cb) => {
    const fileType = /jpeg|jpg|png/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileType.test(file.mimetype);
    if (mimeType && extname) {
        return cb(null, true);
    } else {
        cb("Error");
    }
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 21000000},
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
})

export default upload;