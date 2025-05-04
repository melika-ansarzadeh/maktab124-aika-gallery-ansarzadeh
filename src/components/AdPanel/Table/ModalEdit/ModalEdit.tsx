'use client';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  addproductlocalization,
  modaladdlocalization,
} from '@/constants/localization/localization';
import { useEffect, useState } from 'react';

import { editProduct } from '@/services/editProduct/editProduct';

interface Product {
  _id: string;
  name: string;
  price: string;
  quantity: string;
  brand: string;
  description: string;
  category: string;
  subcategory: string;
  material: string;
  decorations: string;
  made: string;
  stock: string;
  images?: any;
}

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onSuccess: () => void;
  onProductEdited: (updatedProduct: Product) => void;
}

export default function ModalEdit({
  isOpen,
  onClose,
  product,
  onProductEdited,
}: EditProductModalProps) {
  const [formData, setFormData] = useState<Product>({ ...product });
  const [selectedCategory, setSelectedCategory] = useState(
    product.category || ''
  );
  console.log('Data being sent:', formData);

useEffect(() => {
  setFormData({ ...product });
  setSelectedCategory(product.category || '');

  const selectedCategoryOption = categoryOptions.find(
    cat => cat._id === product.category
  );

  if (selectedCategoryOption) {
    const foundSub = selectedCategoryOption.subcategories.find(
      sub => sub._id === product.subcategory
    );

    setFormData(prev => ({
      ...prev,
      subcategory: foundSub?._id || selectedCategoryOption.subcategories[0]._id,
    }));
  }
}, [product]);



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
   const newValue = files ? files[0] : value;

   if (name === 'category') {
     setSelectedCategory(value);
     const selectedCategoryOption = categoryOptions.find(
       cat => cat._id === value
     );
     setFormData(prev => ({
       ...prev,
       category: value,
       subcategory: selectedCategoryOption?.subcategories[0]._id || '',
     }));
   } else {
     setFormData(prev => ({
       ...prev,
       [name]: newValue,
     }));
   }
 };


 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await editProduct(product._id, formData);

     toast.success('محصول با موفقیت ویرایش شد');

     onProductEdited(formData);

     setTimeout(() => {
       onClose();
     }, 500);
   } catch (err: any) {
     console.error(err);
     toast.error(err.response?.data?.message || 'خطا در ویرایش محصول');
   }
 };

 useEffect(() => {
   if (formData.category) {
     setSelectedCategory(formData.category);
   }
 }, [formData.category]);

 useEffect(() => {
   if (isOpen) {
     setFormData({ ...product });
     setSelectedCategory(product.category || '');
   }
 }, [isOpen, product]);


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 font-sahel">
      <ToastContainer />
      <div className="bg-custom-50 px-6 pt-3 pb-10 rounded shadow w-full max-w-lg">
        <button onClick={onClose} className="pr-[28rem] text-3xl block">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {[
            ['name', 'نام محصول'],
            ['price', 'قیمت'],
            ['quantity', 'تعداد'],
            ['material', 'جنس'],
            ['decorations', 'تزئینات'],
            ['made', 'ساخت کشور'],
          ].map(([name, placeholder]) => (
            <input
              key={name}
              name={name}
              placeholder={placeholder}
              value={(formData as any)[name] || ''}
              onChange={handleChange}
              type={name === 'price' || name === 'quantity' ? 'number' : 'text'}
              className="p-3 border-2 text-sm border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
              required={['name', 'price', 'quantity'].includes(name)}
            />
          ))}

          <select
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
            required
          >
            <option value="">{modaladdlocalization.stock}</option>
            <option value="موجود">{modaladdlocalization.instock}</option>
            <option value="نا موجود">{modaladdlocalization.outofstock}</option>
            <option value="به زودی">{modaladdlocalization.commingsoon}</option>
            <option value="متوقف شده">{modaladdlocalization.stopped}</option>
          </select>

          <select
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
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

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
            required
          >
            <option value="">{modaladdlocalization.category}</option>
            {categoryOptions.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.label}
              </option>
            ))}
          </select>

          {selectedCategory ? (
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
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
          ) : (
            <select
              disabled
              className="p-3 text-sm border-2 border-custom-200 outline-none bg-gray-100 text-gray-400"
            >
              <option>{modaladdlocalization.subcategory}</option>
            </select>
          )}

          <textarea
            name="description"
            placeholder={addproductlocalization.description}
            value={formData.description}
            onChange={handleChange}
            className="col-span-2 p-3 text-sm border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
          />

          <input
            type="file"
            name="images"
            onChange={handleChange}
            className="col-span-2 p-3 text-sm bg-white border-2 border-custom-200 outline-none focus:border-custom-500 focus:rounded-sm"
            accept="image/*"
          />

          <button
            type="submit"
            className="col-span-2 bg-custom-400 active:scale-95 text-white p-3 rounded"
          >
            ویرایش محصول
          </button>
        </form>
      </div>
    </div>
  );
}
