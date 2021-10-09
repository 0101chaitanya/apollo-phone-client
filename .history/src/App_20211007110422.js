import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';

function App() {
  const { loading, data, error } = useQuery(ALL_PERSONS, {
    pollInterval: 2000,
  });
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        //
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error....</div>;

  return (
    <div className='App'>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data.allPersons} />
      <PersonForm handleError={handleError} />
      <PhoneForm handleError={handleError} />
    </div>
  );
}

export default App;