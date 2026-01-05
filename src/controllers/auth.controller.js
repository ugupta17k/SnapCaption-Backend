const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
    // Registration logic here
        const { username , password } = req.body; 
    
        const existingUser = await userModel.findOne({ username });
    
        if(existingUser){
            return res.status(409).json({
                message: 'Username already exists'
            });
        }
    
        const user = await userModel.create({
            username,
            password: await bcrypt.hash(password, 10)
        })
    
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET)
    
    
        res.cookie("token" , token)
    
        res.status(201).json({
            message: 'User registered successfully',
            user
        })
}


async function loginController(req, res) {
    // Login logic here
    const { username , password } = req.body;

    const user = await userModel.findOne({
        username 
    })

    if(!user){
        res.status(400).json({
            message: 'Invalid username or password'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        res.status(400).json({
            message: 'Invalid username or password'
        })
    }

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.cookie("token", token)

    res.status(200).json({
        message: 'Login successful',
        id : user._id
    })

}



module.exports = {
    registerController,
    loginController
}