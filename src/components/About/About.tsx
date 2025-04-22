import Image from 'next/image';
import React from 'react';
import about1 from './../../assets/images/about1.png'
import about2 from './../../assets/images/about2.png'
import about3 from './../../assets/images/about3.png';
import bracelet from './../../assets/images/bracelet.png';
import necklace from './../../assets/images/necklace.png';
import ring from './../../assets/images/ring.png';
import earings from './../../assets/images//earings.png';
import { aboutlocalization } from '@/constants/localization/localization';
import products from './../../assets/images/products.png'
import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col gap-10 font-sahel p-5">
      <div className="flex justify-between items-center gap-12 px-72 flex-row-reverse">
        <Image src={about1} alt="about1" width={280} quality={100} />
        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-2xl">{aboutlocalization.about}</h1>
          <div className="font-medium text-base">
            <p>{aboutlocalization.text1}</p>
            <p>{aboutlocalization.text2}</p>
          </div>
          <div className="font-medium text-base">
            <p>{aboutlocalization.text3}</p>
            <p>{aboutlocalization.text4}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-12 px-72 relative">
        <Image src={about2} alt="about2" width={300} quality={100} />
        <Image
          src={about3}
          alt="about3"
          width={200}
          quality={100}
          className="absolute mr-44"
        />
        <div className="font-medium text-base leading-loose">
          <p>{aboutlocalization.text5}</p>
          <p>{aboutlocalization.text6}</p>
          <p>{aboutlocalization.text7}</p>
          <p>{aboutlocalization.text8}</p>
        </div>
      </div>
      <div className="py-12 px-4 flex flex-col items-center">
        <h2 className="text-center text-lg font-semibold mb-5">
          {aboutlocalization.beauty}
        </h2>
        <div className="grid grid-cols-3 gap-4 w-[900px] max-w-full">
          <Link href='' className="relative row-span-2 h-[500px]">
            <Image
              src={necklace}
              alt="Neckpiece"
              className="w-full h-[30rem] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-lg font-medium">
                {aboutlocalization.necklace}
              </span>
            </div>
          </Link>

          <Link href='' className="relative h-[17rem]">
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

          <Link href='' className="relative h-[17rem]">
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

          <Link href='' className="relative h-[17rem]">
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

          <Link href='' className="relative h-[16rem] pb-12">
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
    </div>
  );
}
