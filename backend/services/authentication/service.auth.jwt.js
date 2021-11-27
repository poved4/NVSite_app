const jwt = require("jsonwebtoken")

const jwtSign = process.env.JWT_SIGN
const jwtExpires = process.env.JWT_EXPIRESIN

const getToken = (authorization) => {
    const token = authorization && authorization.split(' ')[1]
    if (!token) throw new Error("Undefined Token")
    return token
}

exports.generateToken = async (_id) => {
    return jwt.sign(
        { _id }, 
        jwtSign, 
        { expiresIn: jwtExpires }, 
        onError(error)
    )
}

exports.verifyToken = (authorization) => {
    const token = getToken(authorization)
    return jwt.verify(token, jwtSign, (error) => {
        if (error.name === 'JsonWebTokenError') throw new Error(`${error.message}`) 
        else return true
    }) 
}

exports.decodeToken = (authorization) => {
    const token = getToken(authorization)
    return jwt.decode(token, jwtSign, (error) => {
        if (error.name === 'JsonWebTokenError') throw new Error(`${error.message}`) 
        else return true
    })
}