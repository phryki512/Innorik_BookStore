import axios from 'axios';

const BASE_URL = 'https://localhost:5001/api'; // or http://localhost:5000

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
