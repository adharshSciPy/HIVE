const multer = require('multer');

// Set up the Multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create a Multer object
const upload = multer({ storage: storage });

module.exports = { upload }