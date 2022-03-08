const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');  //npm install --save mongoose-unique-validator

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // permet de ne pas avoir plusieurs utilisateur avec la même adresse email

module.exports = mongoose.model('User', userSchema);