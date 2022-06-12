import multer from "multer";
import path from "path";
var Upload=async (destination,fileName)=>{
    return multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, `public/${destination}`);
          },
          filename: (req, file, cb) => {
            cb(null,fileName + "-" + Date.now() + path.extname(file.originalname));
          },
    })
}
export default Upload;