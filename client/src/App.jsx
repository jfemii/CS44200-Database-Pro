import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext'; // Import the CartProvider
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Cart from './components/Cart';
import SignIn from './pages/SignIn';
import MyAccount from './pages/MyAccount';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';


const App = () => (
    <CartProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
        </Router>
    </CartProvider>
);

export default App;
