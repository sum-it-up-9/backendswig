const mongoose = require('mongoose');



const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
   
   
}, {
    timestamps: true
});


const cart = mongoose.model('cart', cartSchema);

module.exports = cart;