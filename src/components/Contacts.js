import React, { useState, useEffect } from 'react';


function Contacts() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const organizationId = localStorage.getItem('organizationId');
  const getAccessToken = localStorage.getItem('getAccessToken');


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/contacts?refreshToken=${refreshToken}&accessToken=${accessToken}&organizationId=${organizationId}&getAccessToken=${getAccessToken}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();

        localStorage.setItem('getAccessToken', 0);
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

  const userContacts = data.contacts || [];

  return (
    <div className='Data-grid'>

      <h3>Contacts</h3>
      <table className="Styled-table">
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Mobile</th>
        </tr>

        <tbody>

          {userContacts.map((user) => (
            <tr key={user.contact_id}>
              <td>{user.contact_id}</td>
              <td>{user.contact_type}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Contacts;