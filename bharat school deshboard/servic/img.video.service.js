import multer from "multer";
import path from 'path';

//image uploads
const imageStorage = multer.diskStorage({
  destination: 'image',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
export const imageUploads = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000 * 1000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|apng|avif|gif|svg|xml|webp|bmp|eps|raw|cr2|nef|orf)$/)) {
      return cb(new Error('Please upload a Post'))
    }
    cb(undefined, true)
  }
});