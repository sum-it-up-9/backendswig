const express=require('express');
const router=express.Router();
console.log("router's index file loaded");


//const homeController=require('../controllers/home_controller');
//router.get('/',homeController.home);

//const homeController=require('../controllers/home_controller');
//router.get('/',homeController.home);



//all the routes which is after /user goes below e.g. /user/signup
//router.use('/user',require('./user'));

//for any further routes,access from here
//router.use('/routerName',require('./routerfilename));

module.exports = router;