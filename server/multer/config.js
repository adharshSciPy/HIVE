const multer = require('multer');


// multer configurations
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },

    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
    
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf');
    }
})


const upload = multer({ storage: storage })


exports.upload = upload;
