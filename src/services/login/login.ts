import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';

interface Ilogin {
  username: string;
  password: string;
}

export const LoginUser = async ({ username, password }: Ilogin) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      username,
      password,
    });
      localStorage.setItem('adminAccessToken', response.data.token);
    return response;
  } catch (error) {
    console.error(error);
  }
};
