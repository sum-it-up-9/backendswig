const resdetails = require('../models/resdetails');


// let's keep it same as before
module.exports.home = async function(req, res){
    let data=await resdetails.find({});
    return res.json(200,{
        message:"List of restaurants",
        data:data
    })
}
