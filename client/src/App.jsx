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
import CustomizeTshirt from './pages/CustomizeTshirt';
import CustomizeCanvas from './pages/CustomizeCanvas';
import CustomizePhone from './pages/CustomizePhone';
import CustomizeSweatshirt from './pages/CustomizeSweatshirt';


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
                <Route path="/customize/tshirt" element={<CustomizeTshirt />} />
                <Route path="/customize/canvas" element={<CustomizeCanvas />} />
                <Route path="/customize/phone" element={<CustomizePhone />} />
                <Route path="/customize/sweatshirt" element={<CustomizeSweatshirt />} />
            </Routes>
        </Router>
    </CartProvider>
);

export default App;
