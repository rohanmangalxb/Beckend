const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models');
const { where } = require('sequelize');


// Registring new User
exports.registerUser = async (req, res) => {
    try{
        // const info = req.body;
        // const hashed = bcrypt.hash(info.password, 10)

        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({name, email, password: hashed});

        res.status(201).json({message: "User registered", user})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

// Login for existing User
exports.login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({where: {email}});

        if(!user){
            return res.status(404).json({message: "User not found!"})
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(401).json({message: "Incorrect Password!"})
        }

        const token = jwt.sign({id: user.id}, process.env.jwt_secret, {expiresIn: '1h'})
        res.json({token})
    } catch(err) {
        res.status(500).json({message: err.message})
    }
}

exports.getUser = async (req, res ) => {
    res.json({user: req.user})
}