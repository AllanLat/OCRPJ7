const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
       const name = file.originalname.split(' ').join('_');
       const extension = MIME_TYPES[file.mimetype];
       cb(null, name + Date.now() + '.' + extension);
    }

})
const fileFilter = (req, file, cb) => {
    if (MIME_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  };
  
  module.exports = multer({
    storage,
    limits: { fileSize: 4 * 1024 * 1024 }, // Limite à 4 Mo
    fileFilter,
  }).single('image');