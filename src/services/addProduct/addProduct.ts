import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';

export interface Iaddproducts {
  createdAt: string | number | Date;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  quantity: number;
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
