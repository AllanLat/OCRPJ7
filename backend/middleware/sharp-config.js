const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Middleware qui redimensionne l'image avant de la stocker
function resizeImage(req, res, next) {
  if (!req.file) {
    return next();
  }

  const image_path = req.file.path;
  const image_dir = path.dirname(image_path);
  const image_ext = path.extname(image_path);
  const image_name = path.basename(image_path, image_ext);
  const new_image_name = image_name + "_" + image_ext;
  const new_image_path = path.join(image_dir, new_image_name);

  sharp(req.file.path)
    .resize(206, 260)
    .toFile(new_image_path, (err, info) => {
      if (err) {
        return next(err);
      }
      req.file = {
        ...req.file,
        path: new_image_path,
      };
      console.log(req.file.path);
      const image_url = `./${image_path}`;
      fs.unlink(image_url, (err) => {
        if (err) {
          return next(err);
        }
        next();  
      })
      
    });
  

}

module.exports = resizeImage;
