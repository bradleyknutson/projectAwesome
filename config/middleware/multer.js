const multer = require(`multer`);

module.exports = multer({
    // eslint-disable-next-line indent
  storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        if(!file.mimtype.match(/jpe|jpeg|png$i/)){
            cb(new Error(`File is not supported`), false);
            return; 
        }
        cb(null, true);
    }
});