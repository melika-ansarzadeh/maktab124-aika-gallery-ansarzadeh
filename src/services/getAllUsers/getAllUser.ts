import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';

export const GetUsers = async (token: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data.users;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
