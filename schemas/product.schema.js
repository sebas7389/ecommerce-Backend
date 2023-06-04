const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 150},
    description: {type: String, required: true},
    price:{type: Number, required: true, min: 0, max: 10000000},
    image: {type: String, required: true},
    stock: {type: String, required: true, default: 1},
    active: {type: Boolean, default: true, required: true},
    createdAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now}, 
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true,
    },

});

module.exports = mongoose.model('Product', productSchema);