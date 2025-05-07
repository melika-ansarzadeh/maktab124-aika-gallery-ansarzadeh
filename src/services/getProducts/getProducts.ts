import { BASE_URL } from '@/constants/api/api';
import axios from 'axios';
import { Iaddproducts } from '../addProduct/addProduct';

export interface ProductFilters {
sort?: string;
brand?: string;
category?: string;
price?: string;
limit?: string;
}

export const GetProducts = async (
filters: ProductFilters
): Promise<Iaddproducts[]> => {
try {
const { sort, brand, category, limit = 'all' } = filters;

let url = `${BASE_URL}/api/products?limit=${limit}`;
if (sort) url += `&sort=${sort}`;
if (brand) url += `&brand=${brand}`;
if (category) url += `&category=${category}`;

console.log(url)
const response = await axios.get(url);
return response.data.data.products;
} catch (error) {
console.error(error);
throw error;
}
};
