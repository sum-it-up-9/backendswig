const User = require('../models/user');

// let's keep it same as before
module.exports.addToCart = async function(req, res){
    const { email, item } = req.body;
    let user=await  User.findOne({email});
    if(user){
        user.items.push(item);
        return res.json(200,{
            message:"Added sucessfully",
            cartData:user.items,
        })
    }
    //not found
    else{
        return res.json(400,{
            message:"user not found",
        })
    }
}


module.exports.removeFromCart = async function(req, res){
    const { email, item } = req.body;
    let user=await User.findOne({email});
    if(user){
        user.items.push(item);
        return res.json(200,{
            message:"Added sucessfully",
            cartData:user.items,
        })
    }
    //not found
    else{
        return res.json(400,{
            message:"user not found",
        })
    }
}



/*
const ResModel=require('./models/user');
ResModel({
  name:"abc",
  email:"abc@gmail.com",
  password:"pics15"
}).save();
*/