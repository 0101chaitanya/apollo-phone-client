import React from 'react';
import { gql, useQuery } from '@apollo/client';
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
    <div className='App'>{data.allPersons.map((p) => p.name).join(', ')}</div>
  );
}

export default App;
