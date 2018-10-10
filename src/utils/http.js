import axios from 'axios';

const http = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {

  }
});

export default http;