'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IoMdHeartEmpty } from 'react-icons/io';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { FaRegUser } from 'react-icons/fa6';
import { MdLanguage } from 'react-icons/md';
import logo from '@/assets/images/logo.png';
import { headerlocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Link from 'next/link';
// import jwt_decode from 'jwt-decode';


export default function WebHeader() {
  const [searchValue, setSearchValue] = useState('');
  const pathname = usePathname();
   const [username, setUsername] = useState<string | null>(null);
  
    //  useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const decodedToken: any = jwt_decode(token);
    //       setUsername(decodedToken.username);
    //     } catch (error) {
    //       console.error('Error decoding token:', error);
    //     }
    //   }
    // }, []);

  return (
    <div className="w-full px-4 py-2 font-sahel">
      <div className="flex justify-between">
        <div className="flex items-center justify-between gap-2">
          <Image src={logo} alt="logo" width={20} height={20} />
          <p className="text-xl pb-1 font-serif text-custom-500">
            Aika gallery
          </p>
        </div>
        <div className="flex items-center gap-2 cursor-pointer pb-1">
          <MdLanguage className="text-custom-300 mb-1" />
          <p className="text-sm text-custom-300">FA | EN</p>
        </div>
      </div>

      <div className="flex justify-between items-center my-5">
        <Input
          className="border-2 w-48 h-8 p-2 text-xs rounded-sm outline-none focus:border-2 focus:rounded-md focus:border-custom-200"
          name="searchWeb"
          type="search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder={headerlocalization.search}
        />

        <nav className="flex justify-between text-sm items-center gap-10">
          <Link
            href="/products"
            className="relative inline-block group px-1 text-gray-800"
          >
            <span className="relative z-10 text-sm">
              {' '}
              {headerlocalization.products}{' '}
            </span>
            <span
              className={`absolute right-0 bottom-0 h-[2px] bg-custom-400 transition-all duration-300
              ${
                pathname === '/products'
                  ? 'w-full left-0'
                  : 'w-0 group-hover:w-full group-hover:left-0'
              }`}
            ></span>
          </Link>

          <Link
            href="/brands"
            className="relative inline-block group px-1 text-gray-800"
          >
            <span className="relative z-10 text-sm">
              {' '}
              {headerlocalization.brands}{' '}
            </span>
            <span
              className={`absolute right-0 bottom-0 h-[2px] bg-custom-400 transition-all duration-300
              ${
                pathname === '/brands'
                  ? 'w-full left-0'
                  : 'w-0 group-hover:w-full group-hover:left-0'
              }`}
            ></span>
          </Link>

          <Link
            href="/about"
            className="relative inline-block group px-1 text-gray-800"
          >
            <span className="relative z-10 text-sm">
              {' '}
              {headerlocalization.aboutUs}{' '}
            </span>
            <span
              className={`absolute right-0 bottom-0 h-[2px] bg-custom-400 transition-all duration-300
              ${
                pathname === '/about'
                  ? 'w-full left-0'
                  : 'w-0 group-hover:w-full group-hover:left-0'
              }`}
            ></span>
          </Link>

          <Link
            href="/contact"
            className="relative inline-block group px-1 text-gray-800"
          >
            <span className="relative z-10 text-sm">
              {' '}
              {headerlocalization.callUs}{' '}
            </span>
            <span
              className={`absolute right-0 bottom-0 h-[2px] bg-custom-400 transition-all duration-300
              ${
                pathname === '/contact'
                  ? 'w-full left-0'
                  : 'w-0 group-hover:w-full group-hover:left-0'
              }`}
            ></span>
          </Link>

          <Link
            href="https://parasteh.com/blog/"
            className="relative inline-block group px-1 text-gray-800"
          >
            <span className="relative z-10 text-sm">
              {' '}
              {headerlocalization.blogs}{' '}
            </span>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-custom-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </Link>
        </nav>

        <div className="flex justify-between text-xl pb-2 items-center gap-8 mr-12">
          <IoMdHeartEmpty className="text-custom-400" />
          <LiaShoppingBagSolid className="text-custom-400" />
          <Link href="/login">
            <FaRegUser className="text-custom-400 text-lg" />
            {/* {username ? (
                    <p className="text-xl font-semibold">Welcome, {username}!</p>
                  ) : (
                    <p>Loading user information...</p>
                  )}
             */}
          </Link>
        </div>
      </div>
    </div>
  );
}
