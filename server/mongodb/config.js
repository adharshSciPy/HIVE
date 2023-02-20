const mongoose = require('mongoose')

async function connect() {
    // mongodb connection
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb+srv://adharshscipy:adharshscipy@cluster0.dgrvtap.mongodb.net/?retryWrites=true&w=majority')
        .then(() => {
            console.log('Mongodb Connected')
        })
        .catch((err) => {
            console.log(err)
        })
}


module.exports = connect