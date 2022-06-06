import axios from 'axios';
const development = false;

const url = 'http://localhost:5000';
// const url =

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const login = (data) => server.post(`${url}/api/v1/auth/login`, data);
export const register = (data) =>
  server.post(`${url}/api/v1/auth/register`, data);
export const getNotes = () => server.get(`${url}/api/v1/note/getNotes`);
export const postNote = (data) =>
  server.post(`${url}/api/v1/note/postNote`, data);
