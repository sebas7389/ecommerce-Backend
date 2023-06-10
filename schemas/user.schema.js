const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName: { type: String, required: true, minlength: 6, maxlength: 150 },
    email: { type: String, required: true, unique: true, index: true, minlength: 6, maxlength: 150,
                validate: {validator: function(value) {
                return /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(value)}, message: props =>`${props.value} no es un email valido`}},
    password:  { type: String, required: true, minlength: 6, maxlength: 150 },
    role:{type: String, required: true, default: 'CLIENT_ROLE', enum: ['SUPERADMIN_ROLE','ADMIN_ROLE', 'USER_ROLE', 'CLIENT_ROLE']},
    gender:{type: String, required: true},
    date:{type: Date},
    image:{type: String},
    createdAt:{type: Date, default: Date.now},



})

module.exports = mongoose.model('User', UserSchema)