const express = require('express');
const routes = express.Router();
const {validateSingupRequest,isRequestValidate,fileupload} = require('../../validator');
const {getData,signup,login,uploadImg} = require('../../controler/auth');
const {requireLogin} = require('../../commonMiddleware');
const multer = require('multer');
const path = require('path');
const shortid = require("shortid");







routes.post('/signup',validateSingupRequest,isRequestValidate,signup);

routes.post('/login',login);

// routes.post('/upload',fileupload,upload);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), '../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage });

routes.post('/upload',upload.single('categoryImage'),uploadImg);



routes.get('/getData',requireLogin,getData);



module.exports = routes;