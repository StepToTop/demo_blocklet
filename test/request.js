import axios from 'axios';

const instance = axios.create({
  timeout: 3000,
});

export const request = (options) => {
  return instance.request(options).then((res) => res.data);
};
