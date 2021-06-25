import client from './client';

export const login = ({ username, password }) =>
  client.post('/authenticate', {
    username,
    password,
  });

export const check = () => client.get('/logincheck');
