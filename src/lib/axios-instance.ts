import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://bergas-api.muzaaqi.my.id/api',
});

