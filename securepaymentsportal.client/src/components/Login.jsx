import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        idNumber: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { idNumber, password } = formData;

        // Check for admin
        if (idNumber === "Admin" && password === "Admin123") {
            navigate('/employee'); // redirect to Employee Portal
        } else {
            // Assume it's a customer
            const mockCustomer = {
                id: 1,
                fullName: "Jane Doe",
                idNumber: idNumber,
                accountNumber: "9876543210"
            };
            navigate('/payment', { state: { customer: mockCustomer } });
        }
    };


    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <img src="/l_logo.png" alt="App Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <h2 style={styles.title}>User Login</h2>
                </div>

                <label htmlFor="idNumber" style={styles.label}>ID Number</label>
                <input
                    type="text"
                    name="idNumber"
                    id="idNumber"
                    placeholder="e.g. 1234567890123"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                    autoComplete="off"
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
                    autoComplete="new-password"
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Log In</button>
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
    }
};

export default Login;
