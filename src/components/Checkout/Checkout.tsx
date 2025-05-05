import { useState } from 'react';
import { useRouter } from 'next/router';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // فرض کنید سبد خرید آماده است و می‌خواهید به صفحه پرداخت بروید
    router.push({
      pathname: '/payment',
      query: { ...formData }, // ارسال اطلاعات کاربری به صفحه پرداخت
    });
  };

  return (
    <main className="min-h-screen px-6 py-12 text-[#222] font-sahel">
      <h1 className="text-4xl mb-12">اطلاعات خود را وارد کنید</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm">نام</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">ایمیل</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">شماره تلفن</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">آدرس</label>
          <textarea
            name="address"
            value={formData.address}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg text-sm tracking-wide hover:opacity-90 transition"
        >
          ادامه جهت پرداخت
        </button>
      </form>
    </main>
  );
};

export default Checkout;
