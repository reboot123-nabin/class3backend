const multer=require('multer');

//image file storage location
const storage = multer.diskStorage({
  //file location set
    destination: function (req, file, cb) {
    cb(null, './files')
  },
  //filename set
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

//validation
// function fileFilter (req, file, cb) {
//   // The function should call `cb` with a boolean
//   // to indicate if the file should be accepted
//   // To reject this file pass `false`, like so:
//   // To accept the file pass `true`, like so:
//   if(file.mimetype==="jpg" || file.mimetype==="jpeg"){
//   cb(null, true)//true 
//   }
//   else{
//     cb(null, false)//false
//   }

// }

const upload = multer({ storage: storage })

module.exports= upload;