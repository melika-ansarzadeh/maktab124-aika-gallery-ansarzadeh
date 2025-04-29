import { BASE_URL } from '@/constants/api/api';
import axios, { AxiosError } from 'axios';

export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/products/${id}`);

    return true;
  } catch (error: any) {
    if (error.response && error.response.status === 500) {
      return true;
    }
    console.error('خطای دقیق:', error);
    return false;
  }
};
