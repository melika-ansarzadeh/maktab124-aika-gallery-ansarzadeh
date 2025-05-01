import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { ReactNode } from 'react';
import { Key } from 'readline';

interface Category {
  name: string;
}

interface Subcategory {
  name: string;
}

export interface Iaddproducts {
  decorations: ReactNode;
  images: any;
  _id: Key | null | undefined;
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

export const AddProduct = async ({
  name,
  category,
  subcategory,
  price,
  quantity,
  brand,
  description,
  made,
  material,
  decoration,
  stock,
  image,
}: Iaddproducts) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/products`,
      {
        name,
        category,
        subcategory,
        price,
        quantity,
        brand,
        description,
        made,
        material,
        decoration,
        stock,
        image,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};
