const User = require('../models/model.user');
const Role = require('../models/model.rol');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {

    const { username, email, password, roles } = req.body;

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    })

    // if(roles) {
    //     const foundRoles = await Role.find({name: {$in: roles}})
    //     newUser.roles = foundRoles.map(role => role._id)
    // } else {
    //     const role = await Role.findOne({name: 'user'})
    //     newUser.roles = [role._id]
    // }
    const role = await Role.findOne({name: 'user'})
    newUser.roles = [role._id]

    const savedUser = await newUser.save();
    console.log(savedUser)

    const token = jwt.sign(
        { id: savedUser._id }, 
        process.env.ACCESS_TOKEN, 
        { expiresIn: 86400 } //24 hours
    )
    
    res.status(200).json( {token} )
}

const signIn = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    if(!userFound) res.status(400).json({message: "user not found"})

    const matchPassword = await User.comparePassword(userFound.password, req.body.password)
    if(!matchPassword) return res.status(401).json({token: null, message : 'invalid password'})

    const token = jwt.sign({id: userFound._id}, process.env.ACCESS_TOKEN, {expiresIn: 86400})

    res.status(200).json({token, userFound})
} 

module.exports = {
    signUp,
    signIn
}