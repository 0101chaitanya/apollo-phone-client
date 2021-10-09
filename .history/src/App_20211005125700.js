import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Persons from './components/Persons';
const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`;

function App() {
  const { loading, data, error } = useQuery(ALL_PERSONS);

  if (loading) return <div>Loading....</div>;
  if (error) return <div>Error....</div>;

  return (
    <div className='App'>
      <Persons persons={data} />
    </div>
  );
}

export default App;
