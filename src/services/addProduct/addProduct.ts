import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { ReactNode } from 'react';
import { Key } from 'readline';

interface Category {
  _id: boolean;
  name: string;
}

interface Subcategory {
  name: string;
}

export interface Iaddproducts {
  id: string;
  decorations: ReactNode;
  images: any;
  _id: React.Key | null | undefined;
  name: string;
  category?: Category;
  subcategory?: Subcategory;
  price: string;
  quantity: string;
  brand: string;
  description: string;
  made: string;
  material: string;
  decoration: string;
  stock: string;
  image: string[];
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
