import React, { useState, useEffect } from 'react';


function Receipts() {

    const [data, setData] = useState([]); // State to hold the fetched data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const organizationId = localStorage.getItem('organizationId');
    


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/receipts?refreshToken=${refreshToken}&accessToken=${accessToken}&organizationId=${organizationId}&getAccessToken=${getAccessToken}`, {
                    method: 'GET', // or 'POST', 'PUT', etc.
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                setData(result);
            } catch (error) {
                setError(error.messagge);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const expenseReceipts = data.expenses || [];


    
    

    return (
        <div className='Data-grid'>

            <h3>Receipts</h3>
            <table className="Styled-table">
                <tr>
                    <th>Account Name</th>
                    <th>Customer Name</th>
                    <th>Paid Through</th>
                    <th>Currency</th>
                    <th>Total</th>
                    <th>Total without Tax</th>
                    <th>Date</th>
                </tr>
                <tbody>

                    {expenseReceipts.map((receipt) => (
                        <tr key={receipt.expense_id}>
                            <td>{receipt.account_name}</td>
                            <td>{receipt.customer_name}</td>
                            <td>{receipt.currency_code}</td>
                            <td>{receipt.paid_through_account_name}</td>
                            <td>{receipt.total}</td>
                            <td>{receipt.total_without_tax}</td>
                            <td>{receipt.date}</td>

                        </tr>
                    ))}
                </tbody>

            </table>



        </div>
    );
};



export default Receipts;