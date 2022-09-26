const express = require('express');
const routes = express.Router();
const {validateSingupRequest,isRequestValidate} = require('../../validator');
const {getData,signup,login} = require('../../controler/auth');
const {requireLogin} = require('../../commonMiddleware');




routes.post('/signup',validateSingupRequest,isRequestValidate,signup);

routes.post('/login',login);

routes.get('/getData',requireLogin,getData);



module.exports = routes;