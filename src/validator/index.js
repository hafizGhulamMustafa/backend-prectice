const {check,validationResult} = require('express-validator');
const multer = require('multer');
const path = require('path')

exports.validateSingupRequest=[
    check("first_name").isLength({ min: 2, max: 200 }).withMessage('fisrt name must have at least 2 chars long'),
    check("email").isEmail().withMessage('invalid email'),
    check("password").isLength({ min: 5 }).withMessage('password must be grater then 5 characters'),
    check("passwordConfirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  ];

  exports.fileupload = multer({
    storage: multer.diskStorage({
        destination:function(req,file,cb){
            cb(null, "upload")
        },
        filename: function (req,file,cb){
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        },
        fileFilter:function (req,file, cb) {
                const filetypes = /jpeg|jpg|png|gif/;
                const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
                const mimetype = filetypes.test(file.mimetype);
                if (mimetype && extname) {
                  return cb(null, true);
                } else {
                  cb("Error: Images only!");
                }
              },
            })
      }).single("user_file");

  exports.isRequestValidate =(req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).json({error:errors.array()})
    }
    next();
  }