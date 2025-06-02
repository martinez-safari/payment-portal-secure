import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        accountNumber: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('/api/Auth/login', {
            accountNumber: formData.accountNumber,
            password: formData.password
        });

        // ? Check the role from the backend
        if (response.data.role === 'employee') {
            navigate('/employee');
        } else if (response.data.role === 'customer') {
            navigate('/payment');
        } else {
            alert('Unknown user type');
        }
    } catch (err) {
        alert('Login failed. Please check your credentials.');
    }
};

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <img src="/l_logo.png" alt="App Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <h2 style={styles.title}>Sign in to your account</h2>
                </div>

                <label htmlFor="accountNumber" style={styles.label}>Account Number</label>
                <input
                    type="text"
                    name="accountNumber"
                    id="accountNumber"
                    placeholder="e.g. 623456789012"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <label htmlFor="password" style={styles.label}>Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Sign In</button>

                <p style={styles.footerText}>
                    Don’t have an account? <Link to="/register" style={styles.link}>Sign up</Link>
                </p>
            </form>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        padding: '16px'
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
    },
    header: {
        textAlign: 'center',
        marginBottom: '24px'
    },
    logo: {
        backgroundColor: '#10b981',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '24px',
        width: '50px',
        height: '50px',
        lineHeight: '50px',
        borderRadius: '50%',
        margin: '0 auto 10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    label: {
        fontSize: '14px',
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '6px',
        marginTop: '16px'
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        fontSize: '14px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        marginBottom: '8px'
    },
    button: {
        backgroundColor: '#10b981',
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        padding: '12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px'
    },
    footerText: {
        textAlign: 'center',
        marginTop: '20px',
        fontSize: '14px'
    },
    link: {
        color: '#10b981',
        textDecoration: 'none',
        fontWeight: 'bold'
    }
};

export default Login;
