const user = require('../models/model.user');

/*
Biblioteca para subir imagenes
busboy
multer
*/
const getUsers = async (req, res) => {
    try {
        const usersList = await user.find()
    
        res
        .status( usersList ? 200 : 204 )
        .json( usersList ? usersList : {} )

    } catch (error) { res.status(500).json(error) }
}

const getUserByID = async (req, res) => {
    const { userID } = req.params.id
    const exist = await user.findById(userID)

    res
    .status( exist ? 200 : 204 )
    .json( exist ? exist : {} )
}

const createUser = async (req, res) => {

    let data = {}
    let code = 200

    try {
        const { name, email, password } = req.body
        
        const newUser = new user({
            id: uuidv4(),
            name,
            email,
            password,        
            createdAt: new Date,
            rol_id: '0'
        })
    
        const userSaved = await newUser.save()
        data = userSaved;
        
    } catch (error) {
        code = 500; data = { error }
    } finally {
        res.status(code).json(data)
    }
}

const updateUserByID = async (req, res) => {//put
    
    const { id, password, email } = req.body
    
    const updatedUser = await user.findByIdAndUpdate(
        { id : id },
        { password, email }
    )

    res
    .status( updatedUser ? 200 : 400 )
    .json( updatedUser ? updatedUser : {} )
}

const patchUserByID = async (req, res) => {//patch

    const { id, password, email } = req.body

    const oldData = await user.findById( { _id : id } )

    const newData = {
        "_id": oldData._id,
        "email": !email ? oldData.email : email,
        "password": !password ? oldData.password : password,
        "createdAt": oldData.createdAt
    }

    const data = await user.findByIdAndUpdate( { _id : id }, newData )

    res
    .status( data ? 200 : 400 )
    .json( data ? newData : {} )
}

const deleteUserByID = async (req, res) => {
    const { userID } = req.params.id;
    const data = await user.findByIdAndDelete({ id : userID })

    res 
    .status( !data ? 204 : 404 )
    .json( data ? data : {} )
}

module.exports = { 
    getUsers, 
    getUserByID, 
    createUser,
    updateUserByID,
    patchUserByID,
    deleteUserByID,
}