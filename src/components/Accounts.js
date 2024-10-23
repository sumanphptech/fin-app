import React, { useState, useEffect } from 'react';


const Accounts = () => {

  const [data, setData] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const organizationId = localStorage.getItem('organizationId');



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/chartAccounts?refreshToken=${refreshToken}&accessToken=${accessToken}&organizationId=${organizationId}`, {
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

  const chartOfAccounts = data.chartofaccounts || [];

  return (
    <div className='Data-grid'>

      <h3>Chart of Accounts</h3>
      <table className="Styled-table">
        <tr>
          <th>Account Name</th>
          <th>ID</th>
          <th>Type</th>
        </tr>
        <tbody>
          {chartOfAccounts.map((account) => (
            <tr key={account.account_id}>
              <td>{account.account_name}</td>
              <td>{account.account_id}</td>
              <td>{account.account_type}</td>
            </tr>
          ))}
        </tbody>

      </table>



    </div>
  );
};


export default Accounts;
