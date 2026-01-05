const express = require('express');

const jwt = require('jsonwebtoken');
const {registerController, loginController} = require('../controllers/auth.controller');

const router = express.Router();
const userModel = require('../models/user.model');


router.post('/register' , registerController);
router.post('/login' , loginController);

module.exports = router;