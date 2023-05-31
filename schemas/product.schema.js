const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 30},
    description: {type: String, required: true},
    price:{type: Number, required: true, min: 0, max: 10000000},
    category: {type: String, required: true},
    image: [{type: String, required: true}],

    stock: {type: String, required: true},
    active: {type: Boolean, default: true, required: true},
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true,
    },

});

module.exports = mongoose.model('Product', productSchema);