const multer = require('multer');


// multer configurations
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = file.originalname.replace(/\.pdf$/, '');
        cb(null, filename + '-' + uniqueSuffix + '.pdf')
    }
})


const upload = multer({ storage: storage })


exports.upload = upload;
