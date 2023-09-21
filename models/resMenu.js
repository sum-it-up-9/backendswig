const mongoose = require('mongoose');



const resmenuSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    menu: {
        type: Array,
        required: true
    },
   
   
}, {
    timestamps: true
});


const resmenu = mongoose.model('resmenu', resmenuSchema);

module.exports = resmenu;