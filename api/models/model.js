'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    id: {
        type: String,
        required: 'Введите id пользователя'
    },
    name: {
        type: String,
        required: 'Введите имя пользователя'
    },

});

module.exports = {
   tasks: mongoose.model('Tasks', UserSchema),
   smith:  mongoose.model('Smith', UserSchema),
   unique:  mongoose.model('2d787b52-35a0-40fe-a354-053cad1a8c10', UserSchema),
}
