import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://192.168.15.5:3333',
  baseURL: 'http://10.200.130.149:3333'
});

export default api;