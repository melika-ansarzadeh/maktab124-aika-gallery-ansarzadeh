'use client';

import { useState } from 'react';

import {
  addproductlocalization,
  modaladdlocalization,
} from '@/constants/localization/localization';
import { AddProduct } from '@/services/addProduct/addProduct';
import { toast, ToastContainer } from 'react-toastify';

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

  const [selectedCategory, setSelectedCategory] = useState('');
  const [isImageUploading, setIsImageUploading] = useState(false);

  const categoryOptions = [
    {
      _id: '67fdfc52079f27c844bfb86a',
      label: modaladdlocalization.ring,
      subcategories: [
        { _id: '67fe92cd25dce380f3dc18f5', label: 'کلاسیک' },
        { _id: '6809b24c10a1c94b1c2124dd', label: 'عروس' },
      ],
    },
    {
      _id: '67fdfc76079f27c844bfb86e',
      label: modaladdlocalization.necklace,
      subcategories: [
        { _id: '6809b0e310a1c94b1c2124c3', label: 'گردنبند های بلند' },
        { _id: '67fe6402079f27c844bfb8a5', label: 'گردنبندهای کوتاه' },
      ],
    },
    {
      _id: '67fdfc90079f27c844bfb872',
      label: modaladdlocalization.earrings,
      subcategories: [
        { _id: '67fe95b325dce380f3dc1905', label: 'مرواریدی' },
        { _id: '6809b4a310a1c94b1c2124ea', label: 'حلقه‌ ای' },
      ],
    },
    {
      _id: '67fdfcac079f27c844bfb876',
      label: modaladdlocalization.bracelet,
      subcategories: [
        { _id: '67fe80ad90ae315112f3914d', label: 'دستبندهای آویزی' },
        { _id: '6809b18d10a1c94b1c2124d0', label: 'بنگل' },
      ],
    },
  ];

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
     if (name === 'category') {
       setSelectedCategory(value);
     }
   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quantity = parseInt(formData.quantity);
    const stock = formData.stock;

    if (
      (quantity === 0 && stock === 'موجود') ||
      (quantity > 0 && (stock === 'نا موجود' || stock === 'به زودی'))
    ) {
      toast.info(modaladdlocalization.toastinfo);
      return;
    }

    try {
      await AddProduct(formData);
      onProductAdded();
      setTimeout(() => {
        toast.success(modaladdlocalization.toastinfo);
      }, 100);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(modaladdlocalization.toasterror);
    }
  };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsImageUploading(true);
        setFormData(prev => ({
          ...prev,
          images: file,
        }));

        setTimeout(() => {
          setIsImageUploading(false);
        }, 2000);
      }
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-sahel">
      <ToastContainer />
      <div className="bg-custom-50 px-8 pt-5 rounded shadow w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-3">
            {modaladdlocalization.addproduct}
          </h2>
          <button onClick={onClose} className=" text-black right-4 text-3xl">
            ×
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {[
            ['name', 'نام محصول'],
            ['price', 'قیمت'],
            ['quantity', 'تعداد'],
            ['material', 'جنس'],
            ['decorations', 'تزئینات'],
            ['made', 'ساخت کشور'],
          ].map(([name, placeholder]) => (
            <div key={name} className="flex flex-col space-y-1">
              <label htmlFor={name} className="text-sm font-medium">
                {placeholder} :
              </label>
              <input
                id={name}
                type={
                  name === 'price' || name === 'quantity' ? 'number' : 'text'
                }
                name={name}
                placeholder={placeholder}
                onChange={handleChange}
                className="p-2 border-2 text-sm border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
                required={['name', 'price', 'quantity'].includes(name)}
              />
            </div>
          ))}

          <div className="flex flex-col space-y-1">
            <label htmlFor="stock" className="text-sm font-medium">
              {modaladdlocalization.stock} :
            </label>
            <select
              name="stock"
              onChange={handleChange}
              className="p-2 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              required
            >
              <option value="">{modaladdlocalization.stock}</option>
              <option value="موجود">{modaladdlocalization.instock}</option>
              <option value="نا موجود">
                {modaladdlocalization.outofstock}
              </option>
              <option value="به زودی">
                {modaladdlocalization.commingsoon}
              </option>
              <option value="متوقف شده">{modaladdlocalization.stopped}</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="brand" className="text-sm font-medium">
              {modaladdlocalization.brand} :
            </label>
            <select
              name="brand"
              onChange={handleChange}
              className="p-2 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              required
            >
              <option value="">{modaladdlocalization.brand}</option>
              <option value="Bvlgari">{modaladdlocalization.bvlgari}</option>
              <option value="Tiffani">{modaladdlocalization.tiffani}</option>
              <option value="Cartier">{modaladdlocalization.cartier}</option>
              <option value="Dior">{modaladdlocalization.dior}</option>
              <option value="Chanel">{modaladdlocalization.chanel}</option>
              <option value="Versace">{modaladdlocalization.versace}</option>
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="category" className="text-sm font-medium">
              {modaladdlocalization.category} :
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="p-2 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              required
            >
              <option value="">{modaladdlocalization.category}</option>
              {categoryOptions.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="subcategory" className="text-sm font-medium">
              {modaladdlocalization.subcategory} :
            </label>
            <select
              name="subcategory"
              onChange={handleChange}
              className="p-2 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              required
            >
              <option value="">{modaladdlocalization.subcategory}</option>
              {categoryOptions
                .find(cat => cat._id === selectedCategory)
                ?.subcategories.map(sub => (
                  <option key={sub._id} value={sub._id}>
                    {sub.label}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-col space-y-1 col-span-2">
            <label htmlFor="description" className="text-sm font-medium">
              {addproductlocalization.description} :
            </label>
            <textarea
              name="description"
              id="description"
              placeholder={addproductlocalization.description}
              onChange={handleChange}
              className="p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
            />
          </div>

          <div className="flex flex-col space-y-1 col-span-2">
            <label htmlFor="images" className="text-sm font-medium">
              {modaladdlocalization.uploadImage} :
            </label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              className="p-3 text-sm bg-white border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              accept="image/*"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 bg-custom-400 active:scale-95 text-white p-2 rounded mt-1 w-28 m-auto mb-4"
          >
            {modaladdlocalization.add}
          </button>
        </form>
      </div>
    </div>
  );
}
