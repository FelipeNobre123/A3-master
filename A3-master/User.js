const mongoose = require('mongoose')

const User = mongoose.model('user', {
    nome: String,
    email: String,
    password: String,
})

