const multer = require('multer');


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/blog-uploads')
    },
    filename: (req, file, cb) => {
        console.log('file:', file);
        cb(null, '_' + file.originalname);
    }
});

// Multer Mime Type Validation
const upload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        console.log('----file:', file);
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

module.exports = { upload };