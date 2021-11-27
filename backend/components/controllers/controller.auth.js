const User = require('../models/model.user')
const Role = require('../models/model.rol')

const authJwt = require('../../services/service.auth.jwt')

//registro
const signUp = async (req, res) => {

    const { username, email, password } = req.body
    const role = await Role.findOne({ name: 'user' })

    const newUser = new User({
        username,
        email,
        // roles = role[role._id],
        password: await User.encryptPassword(password),
    })

    const savedUser = await newUser.save()
    if (savedUser) res.status(201).json( {"ok": true} )
}

// if(roles) {
//     const foundRoles = await Role.find({name: {$in: roles}})
//     newUser.roles = foundRoles.map(role => role._id)
// } else {
//     const role = await Role.findOne({name: 'user'})
//     newUser.roles = [role._id]
// }

//Inicio de sesion

const signIn = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles")
    if(!userFound) res.status(400).json({message: "user not found"})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    if(!matchPassword) return res.status(401).json({"ok": false, message : 'invalid data'})

    const token = await authJwt.generateToken(userFound._id)

    res.status(200).json({"ok": true, token})
} 

//Cerrar sesion
const logOut = async (req, res) => {
    
    res.status(200).json({"ok": true, token})
} 

module.exports = { signUp, signIn, logOut }