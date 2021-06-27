import client from './client';

export const login = ({ username, password }) =>
  client.post(
    '/authenticate',
    {
      username,
      password,
    },
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );

export const loginCheck = () => client.get('/logincheck');
