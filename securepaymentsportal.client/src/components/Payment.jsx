import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentData, setPaymentData] = useState({
        amount: '',
        currency: '',
        recipientAccount: '',
        bankName: ''
    });

    const handleChange = (e) => {
        setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/Payment', paymentData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Payment sent successfully!');
        } catch (err) {
            alert('Payment failed');
        }
    };

    return (
        <div style={styles.wrapper}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <img src="/p_logo.png" alt="App Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <h2 style={styles.title}>Make a Payment</h2>
                </div>

                <label htmlFor="amount" style={styles.label}>Amount</label>
                <input
                    type="number"
                    name="amount"
                    id="amount"
                    placeholder="e.g. 1500.00"
                    onChange={handleChange}
                    value={paymentData.amount}
                    required
                    style={styles.input}
                />

                <label htmlFor="currency" style={styles.label}>Currency</label>
                <input
                    type="text"
                    name="currency"
                    id="currency"
                    placeholder="e.g. ZAR"
                    onChange={handleChange}
                    value={paymentData.currency}
                    required
                    style={styles.input}
                />

                <label htmlFor="recipientAccount" style={styles.label}>Recipient Account</label>
                <input
                    type="text"
                    name="recipientAccount"
                    id="recipientAccount"
                    placeholder="e.g. 623456789012"
                    onChange={handleChange}
                    value={paymentData.recipientAccount}
                    required
                    style={styles.input}
                />

                <label htmlFor="bankName" style={styles.label}>Bank Name</label>
                <input
                    type="text"
                    name="bankName"
                    id="bankName"
                    placeholder="e.g. Standard Bank"
                    onChange={handleChange}
                    value={paymentData.bankName}
                    required
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>Pay Now</button>
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

export default Payment;
