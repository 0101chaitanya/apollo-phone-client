import React, { useState } from 'react';
import {
  gql,
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS, PERSON_ADDED } from './queries';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

function App() {
  const { loading, data, error } = useQuery(ALL_PERSONS, {
    //pollInterval: 2000,
  });

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
    },
  });

  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useApolloClient();
  const handleError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>

        <LoginForm setToken={setToken} handleError={handleError} />
        <Notify errorMessage={errorMessage} />
      </div>
    );
  }

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error....</div>;

  return (
    <div className='App'>
      <button onClick={logout}>Log Out</button>
      <Notify errorMessage={errorMessage} />
      <Persons persons={data.allPersons} />
      <PersonForm handleError={handleError} />
      <PhoneForm handleError={handleError} />
    </div>
  );
}

export default App;
