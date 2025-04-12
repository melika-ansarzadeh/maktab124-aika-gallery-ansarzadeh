import { BASE_UEL } from '@/constants/api/api';
import axios from 'axios';

interface Ilogin {
  username: string;
  password: string;
}

export const LoginUser = async ({ username, password }: Ilogin) => {
  try {
    const response = await axios.post(`${BASE_UEL}/auth/login`, {
      username,
      password,
    });
    localStorage.setItem('token', response.data.accessToken);
    return response;
  } catch (error) {
    console.error(error);
  }
};
