'use client';
import {
  loginLocalization,
  signLocalization,
} from '@/constants/localization/localization';
import { SignUser } from '@/services/signUp/signUp';
import Button from '@/shared/Button/Button';
import Input from '@/shared/Inputs/Inputs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../Loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    phoneNumber: '',
    address: '',
  });
  const [error, setError] = useState<{
    firstname?: string;
    lastname?: string;
    username?: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
  }>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors: {
      firstname?: string;
      lastname?: string;
      username?: string;
      password?: string;
      phoneNumber?: string;
      address?: string;
    } = {};

    const usernameRegex = /^[a-zA-Z]{3,20}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const phoneRegex = /^09\d{9}$/;

    const { firstname, lastname, username, password, phoneNumber, address } =
      formData;

    if (!firstname) {
      newErrors.firstname = signLocalization.firstnameriquired;
    }
    if (!lastname) {
      newErrors.lastname = signLocalization.lastnameriquired;
    }
    if (!username) {
      newErrors.username = signLocalization.usernameriquired;
    } else if (!usernameRegex.test(username)) {
      newErrors.username = signLocalization.usernamevalidate;
    }
    if (!password) {
      newErrors.password = signLocalization.passwordriquired;
    } else if (!passwordRegex.test(password)) {
      newErrors.password = signLocalization.passwordvalidate;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = signLocalization.phoneNumberriquired;
    }
    if (!address) {
      newErrors.address = signLocalization.addressriquired;
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await SignUser(formData);
      console.log('Response:', response); // برای بررسی پاسخ درخواست
      if (response?.status === 201) {
        const userData = response.data.data.user;
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.data.token.accessToken);

        toast.success(signLocalization.toastsuccess);

        // بررسی دقیق وضعیت روتینگ
        console.log('Redirecting to home...');
        router.push('/'); // برای روت به صفحه اصلی
      } else {
        toast.error(loginLocalization.toasterror);
        console.log('Error: Status not 200');
      }
    } catch (error) {
      toast.error(loginLocalization.toasterror);
      console.error('Error during sign up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-[45.5rem] overflow-hidden px-6 py-2 font-sahel">
      <ToastContainer />
      <div className="background-signUp absolute inset-0 bg-white/30 backdrop-blur-xl -z-10"></div>
      <div className="relative h-[40rem] mt-9 z-10 bg-white/10 rounded-2xl flex justify-between px-20 mx-20 items-center">
        <div className="text-white flex flex-col gap-4 ">
          <p className="text-2xl mb-3 font-semibold">
            {signLocalization.shine}✨
          </p>
          <div className="text-xl font-light">
            <p>{signLocalization.text1}</p>
            <p>{signLocalization.text2}</p>
          </div>
          <div className="text-xl font-light">
            <p>{signLocalization.text3}</p>
            <p>{signLocalization.text4}</p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-[33rem] w-[32rem] z-10 bg-black/10 p-8 backdrop-blur-xl rounded-2xl flex flex-col gap-9 justify-center items-center"
        >
          <p className="text-white text-xl font-semibold">
            {signLocalization.signUpAccount}
          </p>
          <div className="grid grid-cols-2 gap-x-11 gap-y-5 justify-center items-start">
            <div className="flex flex-col">
              <Input
                label={signLocalization.firstname}
                name="firstname"
                type="text"
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.firstname}
                onChange={handleChange}
                placeholder={signLocalization.enterFirstname}
              />
              {error.firstname && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.firstname}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                label={signLocalization.lastname}
                name="lastname"
                type="text"
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.lastname}
                onChange={handleChange}
                placeholder={signLocalization.enterLastname}
              />
              {error.lastname && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.lastname}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                label={signLocalization.username}
                name="username"
                type="text"
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.username}
                onChange={handleChange}
                placeholder={signLocalization.enterUsername}
              />
              {error.username && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.username}
                </span>
              )}
            </div>

            <div className="flex flex-col relative">
              <Input
                label={signLocalization.password}
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.password}
                onChange={handleChange}
                placeholder={signLocalization.enterPassword}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute left-1 mt-11 text-lg text-custom-400"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
              {error.password && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.password}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                label={signLocalization.phonenumber}
                name="phoneNumber"
                type="number"
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder={signLocalization.enterPhoneNumber}
              />
              {error.phoneNumber && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.phoneNumber}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <Input
                label={signLocalization.address}
                name="address"
                type="text"
                className="p-3 w-52 text-xs rounded-md outline-none focus:border-2 focus:border-black"
                value={formData.address}
                onChange={handleChange}
                placeholder={signLocalization.enterAddress}
              />
              {error.address && (
                <span className="text-red-500 text-xs mt-1 -mb-3 text-center">
                  {error.address}
                </span>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="bg-gray-100 mt-3 text-gray-500 w-24 h-12 p-1 rounded-lg active:scale-95"
          >
            {loginLocalization.login}
          </Button>

          <div className="flex gap-1 items-center text-nowrap text-white">
            <p className="text-sm font-light">
              {signLocalization.doYouWantAccount}
            </p>
            <Link
              className="text-white text-xs underline font-thin"
              href="login"
            >
              {signLocalization.loginAccount}
            </Link>
          </div>
          {loading && (
            <p className='mt-8'>
              <Loading />
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
