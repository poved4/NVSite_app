const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "roles", 
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

module.exports = model('users', userSchema)