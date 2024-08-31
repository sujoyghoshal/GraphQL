import React from 'react';
import './App.css';
import { gql, useQuery } from '@apollo/client';

// GraphQL query
const GET_TODOS_QUERY = gql`
  query GetTodos {
    getAllUsers {
      name
      phone
      username
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_TODOS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllUsers.map(user => (
            <tr key={user.username}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
