import axios from 'axios';
const development = false;

const url = 'http://localhost:5000/';
// const url = ;

export const server = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

