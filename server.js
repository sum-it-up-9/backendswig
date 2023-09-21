
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 5000; // Use the PORT provided by Heroku or 5000 locally

app.use(express.json());
app.use(cors());

// Connect to 

const Connection = require('./database/db.js');

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URI  || `mongodb://${password}:${password}@ac-slvjufh-shard-00-00.ejrgjas.mongodb.net:27017,ac-slvjufh-shard-00-01.ejrgjas.mongodb.net:27017,ac-slvjufh-shard-00-02.ejrgjas.mongodb.net:27017/?ssl=true&replicaSet=atlas-qgs623-shard-0&authSource=admin&retryWrites=true&w=majority`

Connection(URL);

/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', function (error) {
  console.error('Error connecting to MongoDB:', error);
});

db.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});


*/
if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
}


// Controllers and Routes
const userController = require('./controllers/user_controller');
app.get('/user', userController.user);
app.post('/addtocart', userController.addToCart);
app.post('/remove', userController.removefromcart);
app.post('/orders', userController.AddOrder);

const resdetailsController = require('./controllers/resdetails_controller');
app.get('/home', resdetailsController.home);

const resmenuController = require('./controllers/resmenu_controller');
app.get('/menu/:id', resmenuController.menu);

const signupController = require('./controllers/user_controller');
app.post('/signup', signupController.signup);
app.post('/login', signupController.signin);

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});













/*

const express=require('express');

const app=express();
app.use(express.json());
var cors = require('cors');
app.use(cors());
const mongoose=require('mongoose');
//onst mongoDB="mongodb://localhost:27017/test_db";



//const MongoClient=require('mongodb').MongoClient
mongoose.connect('mongodb://127.0.0.1:27017/test_db');

const db=mongoose.connection;

db.on('error', function(error) {
    console.error('Error connecting to MongoDB:', error);
 });

db.once('open', function(){
   console.log('connected to Database :: MongoDB');
});

const userController=require('./controllers/user_controller');
app.get('/user',userController.user);
app.post('/addtocart',userController.addToCart);
app.post('/remove',userController.removefromcart);
app.post('/orders',userController.AddOrder);

const resdetailsController=require('./controllers/resdetails_controller');
app.get('/home',resdetailsController.home);


const resmenuController=require('./controllers/resmenu_controller');
app.get('/menu/:id',resmenuController.menu);





const signupController=require('./controllers/user_controller');
app.post('/signup',signupController.signup);
app.post('/login',signupController.signin);


app.get('/',(req,res)=>{
   res.send('welcome')
});

//app.use('/',require('./routes'));


app.listen(5000,function(err){
   if(err){
       console.log('Error in running the server',err)
   }
   console.log('server is running on port 5000')
});








/*
const ResModel=require('./models/user');
ResModel({
  name:"abc",
  email:"abc@gmail.com",
  password:"pics15"
}).save();
*/
