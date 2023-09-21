const mongoose = require('mongoose');



const resdetailsSchema = new mongoose.Schema({
    statusCode: {
        type: Number,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    tid: {
        type: Object,
        required: true
    },
    sid: {
        type: String,
        required: true
    },
    
    deviceId: {
        type: String,
        required: true
    },
    
    csrfToken: {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
});






const resdetails = mongoose.model('resdetails', resdetailsSchema);

module.exports = resdetails;