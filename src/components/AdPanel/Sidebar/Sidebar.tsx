'use client'
import React from 'react'
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

   const handleLogout = ()=>{
    localStorage.removeItem('token')
    router.push('/login')
   }
  return (
    <div className=" h-screen mr-4 py-6 w-20 flex flex-col justify-center overflow-hidden ">
      <div className="h-screen w-full bg-custom-400 rounded-3xl shadow-xl flex flex-col justify-evenly gap-20 text-2xl items-center ">
        <div className="flex flex-col items-center justify-center gap-10">
          <Link
            href="homeAd"
            className={`block p-3 rounded ${
              pathname.startsWith('/homeAd')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
          >
            <AiOutlineHome />
          </Link>
          <Link
            href="productAd"
            className={`block p-3 rounded ${
              pathname.startsWith('/productAd')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
          >
            <AiOutlineProduct />
          </Link>
          <Link
            href="productQuallity"
            className={`block p-3 rounded ${
              pathname.startsWith('/productQuallity')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
          >
            <TiDocumentText />
          </Link>
          <Link
            href="orders"
            className={`block p-3 rounded ${
              pathname.startsWith('/orders')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
          >
            <HiOutlineClipboardDocumentList />
          </Link>
          <Link
            href="users"
            className={`block p-3 rounded ${
              pathname.startsWith('/users')
                ? 'bg-white rounded-full font-bold'
                : ''
            }`}
          >
            <FaUsers />
          </Link>
        </div>
        <Button children={<MdOutlineLogout />} onClick={handleLogout}/>
      </div>
    </div>
  );
}
