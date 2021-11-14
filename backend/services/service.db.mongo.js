const mongoose = require('mongoose')
mongoose.connect( 'mongodb://localhost:27017/messdb', { useNewUrlParser: true } )

mongoose.connection
    .once('open', () => console.log('connected to mongodb'))
    .on('error', error => console.error(error.message))

module.exports = mongoose