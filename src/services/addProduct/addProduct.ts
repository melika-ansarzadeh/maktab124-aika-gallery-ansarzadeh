import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';

export interface Iaddproducts {
  _id: string;
  name: string;
  price: string;
  quantity: string;
  material: string;
  decorations: string;
  made: string;
  stock: string;
  category: string;
  subcategory: string;
  brand: string;
  description: string;
  images?: File | null;
}

export const AddProduct = async (productData: Iaddproducts) => {
  try {
    const formData = new FormData();

    Object.entries(productData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value as any);
      }
    });

    const response = await axios.post(`${BASE_URL}/api/products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('خطا:', error);
  }
};
