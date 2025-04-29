import { BASE_URL } from '@/constants/api/api';
import axios, { AxiosError } from 'axios';

export const deleteProduct = async (_id: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/products/${_id}`,
    );
    return response.status === 200;
  } catch (error) {
   const err = error as AxiosError<any>;
    console.error("خطای دقیق:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || 'مشکلی پیش آمد. دوباره امتحان کنید');
  }
};
