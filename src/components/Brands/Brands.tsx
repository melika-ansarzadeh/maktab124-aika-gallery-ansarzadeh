import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import tiffani from '@/assets/images/tiffany.png'
import { brandslocalization } from '@/constants/localization/localization';
import cartier from '@/assets/images/cartier.png'
import dior from '@/assets/images/dior.png';
import versace from '@/assets/images/versace.png';
import chanel from '@/assets/images/chanel.png';
import bvlgari from '@/assets/images/bvlgari.png';

export default function Brands() {
  return (
    <div className="flex flex-col gap-6 px-56 py-10 font-sahel">
      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={tiffani}
            alt="tiffani"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Tiffani</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.tiffanitext}
          </p>
        </div>
      </Link>

      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={cartier}
            alt="cartier"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Cartier</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.cartiertext}
          </p>
        </div>
      </Link>

      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={bvlgari}
            alt="bvlgari"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Bvlgari</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.bvlgaritext}
          </p>
        </div>
      </Link>

      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={versace}
            alt="versace"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Versace</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.versacetext}
          </p>
        </div>
      </Link>

      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={chanel}
            alt="chanel"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Chanel</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.caneltext}
          </p>
        </div>
      </Link>

      <Link
        href=""
        className="flex items-center gap-6 bg-custom-50 p-6 rounded-3xl shadow-md hover:shadow-xl transition duration-300 hover:scale-[1.02] h-40"
      >
        <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
          <Image
            src={dior}
            alt="dior"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Dior</h3>
          <p className="text-base text-gray-600 mt-1">
            {brandslocalization.diortext}
          </p>
        </div>
      </Link>
    </div>
  );
}
