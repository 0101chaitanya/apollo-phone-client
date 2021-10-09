import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { LOGIN } from '../queries';

const LoginForm = ({ handleError, setToken }) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      handleError(error.graphQLErrors[0].message);
    },
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      console.log(result.data);
      setToken(token);
      localStorage.setItem('gql-phone-token', token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  const submit = async (e) => {
    e.preventDefault();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  return <div></div>;
};

export default LoginForm;
