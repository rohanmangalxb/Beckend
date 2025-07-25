const { where } = require('sequelize')
const User = require('../models')

exports.getAll = async (req, res) => {
    const users = await User.findAll({attributes: {exclude: ['password']}})

    if(!users) res.status(404).json({message: "No users found"})

    res.status(201).json(users)
}

exports.getUserById = async(req, res) => {
    const users = await User.findByPk(req.params.id, {attributes: {exclude: ['password']}})

    if(!users) res.status(404).json({message: "User not found!"});

    res.json(users)
}

exports.deleteUser = async(req, res) => {
    const user = await User.destroy({where: {id: req.params.id}, truncate: true})
    if(!user) return res.status(404).json({message: "User not found!"});
    res.json(user);
}

exports.deleteAll = async(req, res) => {
    const user = await User.destroy({where: {}, truncate: true})
    if(!user) return res.status(404).json({message: "No Users found!"});
    
    res.json(user)
}