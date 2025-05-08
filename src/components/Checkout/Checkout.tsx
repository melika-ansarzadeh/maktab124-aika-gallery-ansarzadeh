'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import moment from 'moment-jalaali';
import 'react-datepicker/dist/react-datepicker.css';
import { checkoutlocalization } from '@/constants/localization/localization';
import Link from 'next/link';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type UserInfo = {
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  postalCode: string;
  deliveryDate: string;
};

type Errors = Partial<Record<keyof UserInfo, string>>;

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstname: '',
    lastname: '',
    username: '',
    phoneNumber: '',
    address: '',
    postalCode: '',
    deliveryDate: '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();
    useEffect(() => {
      const user = localStorage.getItem('user');
      const token = user ? JSON.parse(user).refreshToken : null;

      if (!token) {
        router.push('/login');
      }
    }, [router]);

  useEffect(() => {
    try {
      const persisted = localStorage.getItem('persist:aika-gallery');
      if (persisted) {
        const parsedPersisted = JSON.parse(persisted);
        const cartRaw = parsedPersisted.cart;
        if (cartRaw) {
          const cart = JSON.parse(cartRaw);
          if (cart.items && Array.isArray(cart.items)) {
            setCartItems(cart.items);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!userInfo.firstname.trim()) newErrors.firstname = checkoutlocalization.validationname;
    if (!userInfo.lastname.trim())
      newErrors.lastname = checkoutlocalization.validationlastname;
    if (!userInfo.username.trim()) newErrors.username = checkoutlocalization.validationusername;
    if (!/^09\d{9}$/.test(userInfo.phoneNumber))
      newErrors.phoneNumber = checkoutlocalization.validationphone;
    if (!userInfo.address.trim()) newErrors.address = checkoutlocalization.validatonaddress;
    if (!userInfo.postalCode.trim())
      newErrors.postalCode = checkoutlocalization.validationcode;
    if (!/^\d{10}$/.test(userInfo.postalCode))
      newErrors.postalCode = checkoutlocalization.validatoncodecount;
    if (!userInfo.deliveryDate.trim())
      newErrors.deliveryDate = checkoutlocalization.validationdate;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name as keyof UserInfo]: '' });
  };

 const handleDateChange = (date: Date | null, event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => {
  if (!date) return;
    setUserInfo({
      ...userInfo,
      deliveryDate: moment(date).format('jYYYY/jMM/jDD'),
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const checkoutData = {
      cart: cartItems,
      userInfo,
      totalPrice: calculateTotal(),
    };

    localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    router.push('/payment');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 font-sahel">
      <h1 className="text-2xl font-bold text-center mb-6">
        {checkoutlocalization.checkout}
      </h1>

      <div className="grid md:grid-cols-2 gap-32 mt-10">
        <div className="border p-3 rounded-lg shadow bg-custom-50 gap-4">
          <h2 className="text-xl font-bold mb-5 mt-4 px-5">
            {checkoutlocalization.cart}
          </h2>
          {cartItems.length === 0 ? (
            <p>{checkoutlocalization.nothing}</p>
          ) : (
            <div className="space-y-4 px-5">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="border-2 border-custom-500 p-3 flex items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p>
                      {checkoutlocalization.price} :
                      {item.price.toLocaleString()}{' '}
                      {checkoutlocalization.tooman}
                    </p>
                    <p>
                      {checkoutlocalization.quantity} {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleCheckout}
          className="bg-custom-50 rounded-lg shadow p-7 space-y-2 max-h-[80vh] overflow-auto"
        >
          <h3 className="text-center text-lg font-semibold pb-3 pt-2">
            {checkoutlocalization.information}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm" htmlFor="firstname">
                {checkoutlocalization.name} :
              </label>
              <input
                type="text"
                name="firstname"
                placeholder={checkoutlocalization.name}
                value={userInfo.firstname}
                onChange={handleChange}
                className={`w-full border p-2 rounded mt-1 ${
                  errors.firstname ? 'border-red-500' : ''
                }`}
              />
              {errors.firstname && (
                <p className="text-xs text-red-500 mt-1">{errors.firstname}</p>
              )}
            </div>

            <div>
              <label className="text-sm" htmlFor="lastname">
                {checkoutlocalization.lastname} :
              </label>
              <input
                type="text"
                name="lastname"
                placeholder={checkoutlocalization.lastname}
                value={userInfo.lastname}
                onChange={handleChange}
                className={`w-full border p-2 rounded mt-1  ${
                  errors.lastname ? 'border-red-500' : ''
                }`}
              />
              {errors.lastname && (
                <p className="text-xs text-red-500 mt-1">{errors.lastname}</p>
              )}
            </div>

            <div>
              <label className="text-sm" htmlFor="username">
                {checkoutlocalization.username} :
              </label>
              <input
                type="text"
                name="username"
                placeholder={checkoutlocalization.username}
                value={userInfo.username}
                onChange={handleChange}
                className={`w-full border p-2 rounded  mt-1  ${
                  errors.username ? 'border-red-500' : ''
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="text-sm" htmlFor="phoneNumber">
                {checkoutlocalization.phonenumber} :
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder={checkoutlocalization.phonenumber}
                value={userInfo.phoneNumber}
                onChange={handleChange}
                className={`w-full border p-2 rounded  mt-1  ${
                  errors.phoneNumber ? 'border-red-500' : ''
                }`}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="text-sm" htmlFor="address">
                {checkoutlocalization.address} :
              </label>
              <textarea
                name="address"
                placeholder={checkoutlocalization.address}
                value={userInfo.address}
                onChange={handleChange}
                className={`w-full border p-2 rounded h-20 resize-none mt-1  ${
                  errors.address ? 'border-red-500' : ''
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="text-sm" htmlFor="postalCode">
                {checkoutlocalization.code} :
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder={checkoutlocalization.code}
                value={userInfo.postalCode}
                onChange={handleChange}
                className={`w-full border p-2 rounded mt-1  ${
                  errors.postalCode ? 'border-red-500' : ''
                }`}
              />
              {errors.postalCode && (
                <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="text-sm" htmlFor="">
                {checkoutlocalization.date} :
              </label>
              <DatePicker
                selected={
                  userInfo.deliveryDate
                    ? moment(userInfo.deliveryDate, 'jYYYY/jMM/jDD').toDate()
                    : null
                }
                onChange={handleDateChange}
                placeholderText="0000/00/00"
                dateFormat="yyyy/MM/dd"
                className={`w-full border p-2 rounded mb-4 mt-1  ${
                  errors.deliveryDate ? 'border-red-500' : ''
                }`}
              />
              {errors.deliveryDate && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.deliveryDate}
                </p>
              )}
            </div>
          </div>

          <Link href='paymentsss'>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium active:scale-95"
            >
              {checkoutlocalization.payment}
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
