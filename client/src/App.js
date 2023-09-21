import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RestaurantMenu from './components/RestaurantMenu.js';
import Body from './components/Body';
import SignUp from './screens/SignUp.js';
import SignIn from './screens/SignIn.js';
import Cart from './screens/Cart.js';
import Header from './components/Header.js';
import { Provider } from 'react-redux';
import store from './utils/store';
import Orders from './screens/Orders';
import MyOrders from './screens/MyOrders';


function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/res" element={<Body />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/Myorders" element={<MyOrders />} />
         
        </Routes>
      </Router>
    </div>
    </Provider>
  );
}

export default App;


