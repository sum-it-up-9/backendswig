const resmenu = require('../models/resMenu');


// let's keep it same as before
module.exports.menu = async function(req, res){
    //Post.findById(req.params.id);
    let data=await resmenu.findOne({id: req.params.id});
    return res.json(200,{
        message:"List of Menu",
        data:data
    })
}
