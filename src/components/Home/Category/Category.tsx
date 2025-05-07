import { aboutlocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import bracelet from '@/assets/images/bracelet.png';
import necklace1 from '@/assets/images/necklace.png';
import ring from '@/assets/images/ring.png';
import earings from '@/assets/images//earings.png';
import products from '@/assets/images/products.png';

export default function Category() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-[900px] max-w-full m-auto">
        <Link
          href="http://localhost:3000/products?category=67fdfc76079f27c844bfb86e"
          className="relative row-span-2 h-[500px]"
        >
          <Image
            src={necklace1}
            alt="Neckpiece"
            className="w-full h-[30rem] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {aboutlocalization.necklace}
            </span>
          </div>
        </Link>

        <Link
          href="http://localhost:3000/products?category=67fdfc52079f27c844bfb86a"
          className="relative h-[17rem]"
        >
          <Image
            src={ring}
            alt="Rings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {aboutlocalization.ring}
            </span>
          </div>
        </Link>

        <Link
          href="http://localhost:3000/products?category=67fdfcac079f27c844bfb876"
          className="relative h-[17rem]"
        >
          <Image
            src={bracelet}
            alt="Bracelet"
            className="w-full h-full object-cover mt-[7rem]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-medium mt-[15rem]">
              {aboutlocalization.bracelet}
            </span>
          </div>
        </Link>

        <Link
          href="http://localhost:3000/products?category=67fdfc90079f27c844bfb872"
          className="relative h-[17rem]"
        >
          <Image
            src={earings}
            alt="Earrings"
            className="w-full h-full object-cover bg-black/50"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {aboutlocalization.earings}
            </span>
          </div>
        </Link>

        <Link
          href="http://localhost:3000/products"
          className="relative h-[16rem] pb-12"
        >
          <Image
            src={products}
            alt="product"
            className="w-[11rem] h-full object-cover mt-[7rem] inset-0 bg-black/50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg font-medium mt-[11rem] ml-[7rem]">
              {aboutlocalization.products}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
