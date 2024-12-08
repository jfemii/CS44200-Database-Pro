import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignIn = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLogin && formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        try {
            const endpoint = isLogin ? 'http://localhost:8800/api/signin' : 'http://localhost:8800/api/signup';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                if (isLogin) {
                    // Store user data in localStorage after successful login
                    localStorage.setItem('user', JSON.stringify(data.user));
                    console.log('User data stored:', data.user); // Debug log
                }
                navigate('/');
            } else {
                alert(data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred');
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            <Navbar />
            <div className="auth-container">
                <div className="auth-form">
                    <h2>{isLogin ? 'Sign In' : 'Create Account'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {!isLogin && (
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        )}
                        <button type="submit" className="auth-button">
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                    <div className="auth-switch">
                        {isLogin ? (
                            <p>
                                Need to create an account?{' '}
                                <button onClick={() => setIsLogin(false)}>Sign Up</button>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <button onClick={() => setIsLogin(true)}>Sign In</button>
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;