'use client';

import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/api/api';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: () => void;
}

export default function ModalAdd({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    brand: '',
    description: '',
    category: '',
    subcategory: '',
    material: '',
    decorations: '',
    made: '',
    stock: '',
    images: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as any;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });

    try {
      const response = await axios.post(`${BASE_URL}/api/product`, data);
      console.log('محصول با موفقیت اضافه شد', response.data);
      onProductAdded();
    } catch (error) {
      console.error('خطا در افزودن محصول', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">افزودن محصول جدید</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            ['name', 'نام محصول'],
            ['price', 'قیمت'],
            ['quantity', 'تعداد'],
            ['brand', 'برند'],
            ['category', 'دسته‌بندی'],
            ['subcategory', 'زیر دسته'],
            ['material', 'جنس'],
            ['decorations', 'تزئینات'],
            ['made', 'ساخت کشور'],
            ['stock', 'وضعیت موجودی'],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              type={name === 'price' || name === 'quantity' ? 'number' : 'text'}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              className="border p-2"
              required={['name', 'price', 'quantity'].includes(name)}
            />
          ))}

          <textarea
            name="description"
            placeholder="توضیحات"
            onChange={handleChange}
            className="col-span-2 border p-2"
          />
          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="col-span-2 border p-2"
            accept="image/*"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white p-2 rounded"
          >
            افزودن
          </button>
        </form>
        <button onClick={onClose} className="text-red-500 mt-4 block">
          بستن
        </button>
      </div>
    </div>
  );
}
