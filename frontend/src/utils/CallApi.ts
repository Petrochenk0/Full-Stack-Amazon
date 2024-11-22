import axios from 'axios';

import { BASE_URL } from './constans';

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const callData = async (recource: string) => {
  const { data } = await axios.get(`${BASE_URL}/${recource}`, config);
  return data;
};
