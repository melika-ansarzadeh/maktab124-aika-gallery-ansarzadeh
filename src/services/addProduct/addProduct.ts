import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { ReactNode } from 'react';

interface Category {
  _id: string;
  name: string;
}

interface Subcategory {
  name: string;
}

export interface Iaddproducts {
  [key: string]: any;
  decorations: ReactNode;
  _id?: string;
  name: string;
  category?: Category | string;
  subcategory?: Subcategory | string;
  price: string;
  quantity: string;
  material: string;
  made: string;
  stock: string;
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
