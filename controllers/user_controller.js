const User = require('../models/user');
var jwt = require('jsonwebtoken');
const resdetails = require('../models/resdetails');
// let's keep it same as before

module.exports.user = async function(req, res){
    let data=await User.find({});
    return res.json(200,{
        message:"List of users",
        data:data
    })
}

//signIN
module.exports.signin = async function(req, res){
    const { email, password } = req.body;
    console.log(req.body);
    let success=false;
    const jwtSecret = "HaHa";
    try {
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "User with given email id does not exist" });
        }

        const pwdCompare = (password===user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.email
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        // Assuming you have already generated the authToken
        res.cookie('authToken', authToken, {
            httpOnly: true, // Make the cookie HttpOnly
            secure: true, // Use 'secure: true' in production to ensure it's only sent over HTTPS
            // Other cookie options like 'maxAge', 'sameSite', etc.
        });
  
        // Now you can send a response with a success message or redirect as needed
        res.status(200).json({ success: true, message: 'Login successful',user:user });
  
       


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
}


//signUp
module.exports.signup = async function (req, res) {
    console.log(req.body);
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        const newUser = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          items: [],
        });
        return res.status(201).json({ success: true, newUser });
      } else {
        const msg = 'You have already signed up, login to continue!';
        return res.status(400).json({ success: false, message:msg });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error", data: err });
    }
  };
  


module.exports.addToCart = async function(req, res){
    const { email, item } = req.body;
    const {id, name, price }=item;
    let user = await User.findOne({ email });
    if(user){
        const existingItemIndex = user.items.findIndex(item => item.id === id);
        if(existingItemIndex !== -1){
           
            user.items[existingItemIndex].quantity += 1;
            //By calling user.markModified('items'), we're telling Mongoose to mark the items field of the user document as modified and in need of saving.
            user.markModified('items');
            await user.save();
            return res.json(200, {
                message: "Item quantity updated",
                cartData: user.items
            });
            
        } else {
            
            user.items.push({
                id: id,
                name: name || "Unknown",
                price:price,
                quantity: 1
            });
            user.markModified('items');
            await user.save();
            return res.json(200, {
                message: "Item added successfully",
                cartData: user.items
            });
        }
    } else {
        return res.json(400, {
            message: "User not found"
        });
    }
}

module.exports.removefromcart = async function(req, res){
    const { email, id, name, price } = req.body;
    let user = await User.findOne({ email });
    if(user){
        const existingItemIndex = user.items.findIndex(item => item.id === id);
        if(existingItemIndex !== -1){
            user.items[existingItemIndex].quantity -= 1;
            //By calling user.markModified('items'), we're telling Mongoose to mark the items field of the user document as modified and in need of saving.
            user.markModified('items');
            await user.save();
            return res.json(200, {
                message: "Item quantity updated",
                cartData: user.items
            });
        } else {
            return res.json(200, {
                message: "Item not present",
                cartData: user.items
            });
        }
    } else {
        return res.json(400, {
            message: "User not found"
        });
    }
}



module.exports.AddOrder =async function(req,res){
    try {
        const { email, cartItems  } = req.body;
        const {resId}=cartItems[0];
        console.log('resId',resId);
        // Find the user by email
        const user = await User.findOne({ email });
        const rest= await resdetails.find({});
        
       
    
        const resList= rest[0].data?.cards[2]?.data?.data?.cards;
        console.log('resList :', resList);

        const foundRestaurant = resList.find(restaurant => restaurant.data.id === resId.toString());
     
        if (foundRestaurant) {
            console.log('Restaurant found:');
        } else {
            console.log('Restaurant not found with ID:', targetId);
        }


        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }


        const currentDate = new Date();

        // Extract the components of the date
        const month = currentDate.toLocaleString('en-US', { month: 'long' });
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();

        // Construct the formatted date string
        const formattedDate = `${month} ${day}, ${year}`;


        user.items.push( {cartItems, OrderInfo:foundRestaurant,Date:formattedDate } ); 
        await user.save();
        res.status(200).json({ message: 'Order placed successfully',items:user.items, OrderInfo:foundRestaurant, Date:formattedDate });
      } catch (error) {
        // Handle any server errors
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error' });
      }
    
}