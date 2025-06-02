import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeePortal = () => {
    const [payments, setPayments] = useState([]);

    const fetchPayments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/Payment', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayments(response.data);
        } catch (err) {
            alert('Failed to fetch payments');
        }
    };

    const verifyPayment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`/api/Payment/verify/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchPayments(); // refresh after verifying
        } catch (err) {
            alert('Verification failed');
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.logo}>
                        <img src="/e_logo.png" alt="Employee Logo" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                    </div>
                    <h2 style={styles.title}>Employee Payment Portal</h2>
                </div>

                {payments.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#6b7280' }}>No payments found.</p>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Amount</th>
                                    <th style={styles.th}>Currency</th>
                                    <th style={styles.th}>Recipient Account</th>
                                    <th style={styles.th}>Bank Name</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment.id}>
                                        <td style={styles.td}>{payment.amount}</td>
                                        <td style={styles.td}>{payment.currency}</td>
                                        <td style={styles.td}>{payment.recipientAccount}</td>
                                        <td style={styles.td}>{payment.bankName}</td>
                                        <td style={styles.td}>{payment.status}</td>
                                        <td style={styles.td}>
                                            {payment.status === "PENDING" ? (
                                                <button style={styles.verifyButton} onClick={() => verifyPayment(payment.id)}>Verify</button>
                                            ) : (
                                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Verified</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif',
        padding: '16px'
    },
    container: {
        backgroundColor: '#ffffff',
        padding: '32px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '900px',
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
    tableWrapper: {
        overflowX: 'auto',
        marginTop: '16px'
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse'
    },
    th: {
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        textAlign: 'left',
        padding: '12px',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    td: {
        borderBottom: '1px solid #e5e7eb',
        padding: '12px',
        fontSize: '14px'
    },
    verifyButton: {
        backgroundColor: '#10b981',
        color: 'white',
        fontWeight: 'bold',
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px'
    }
};

export default EmployeePortal;
