'use client';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { FaUsers } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import { MdOutlineLogout } from 'react-icons/md';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/shared/Button/Button';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <div className="h-screen mr-4 py-6 w-20 flex flex-col justify-center overflow-hidden">
      <div className="h-screen w-full bg-custom-100 rounded-3xl shadow-xl flex flex-col justify-evenly gap-20 text-2xl items-center">
        <div className="flex flex-col items-center justify-center gap-10">
          <Link
            href="homeAd"
            className={`block p-3 rounded relative group ${
              pathname.startsWith('/homeAd')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
            title="خانه"
          >
            <AiOutlineHome />
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              خانه
            </span>
          </Link>
          <Link
            href="productAd"
            className={`block p-3 rounded relative group ${
              pathname.startsWith('/productAd')
                ? 'bg-white rounded-full '
                : ''
            }`}
            title="محصولات"
          >
            <AiOutlineProduct />
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              محصولات
            </span>
          </Link>
          <Link
            href="productQuallity"
            className={`block p-3 rounded relative group ${
              pathname.startsWith('/productQuallity')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
            title="موجودی و قیمت"
          >
            <TiDocumentText />
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs text-nowrap rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              موجودی و قیمت
            </span>
          </Link>
          <Link
            href="orders"
            className={`block p-3 rounded relative group ${
              pathname.startsWith('/orders')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
            title="سفارشات"
          >
            <HiOutlineClipboardDocumentList />
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              سفارشات
            </span>
          </Link>
          <Link
            href="users"
            className={`block p-3 rounded relative group ${
              pathname.startsWith('/users')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
            title="کاربران"
          >
            <FaUsers
            className='focus:text-red-500' />
            <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-white text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              کاربران
            </span>
          </Link>
        </div>
        <Button children={<MdOutlineLogout />} onClick={handleLogout} />
      </div>
    </div>
  );
}
