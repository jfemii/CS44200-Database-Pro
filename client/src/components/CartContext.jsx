import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage or empty array
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => [...prevItems, { ...product, quantity: product.quantity || 1 }]);
    };

    const removeFromCart = (index) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prevItems => 
            prevItems.map((item, i) => 
                i === index ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => 
            total + (item.price * (item.quantity || 1)), 0
        );
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getTotalItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
