import { BASE_URL } from "@/constants/api/api";
import axios from "axios";

export const editProduct = async (id: string, formData: any) => {
  try {
    const allowedFields = [
      'name',
      'price',
      'brand',
      'description',
      'material',
      'decorations',
      'made',
      'category',
      'subcategory',
      'quantity',
      'stock',
    ];

    const data = new FormData();

    allowedFields.forEach(field => {
      const value = formData[field];
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof File) {
          data.append(field, value);
        } else {
          data.append(field, String(value));
        }
      }
    });

    const response = await axios.patch(`${BASE_URL}/api/products/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('خطا در به‌روزرسانی محصول:', error);
    throw error;
  }
};
