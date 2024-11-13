import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 1000 * 5,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;