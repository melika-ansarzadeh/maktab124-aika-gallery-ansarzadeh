import React from 'react';
import BrandSwiper from './HeroBaner/HeroBaner';
import banbvlgari from '@/assets/images/banerbvlgari.png';
import bantiffani from '@/assets/images/banertiffani.png';
import bandior from '@/assets/images/banerdior.png';
import banchanel from '@/assets/images/banerchanel.png';
import banversace from '@/assets/images/banerversace.png';
import bancartier from '@/assets/images//banercartier.png';
import Image from 'next/image';
import {homelocalization } from '@/constants/localization/localization';
import tiffani from '@/assets/images/tiffany.png';
import cartier from '@/assets/images/cartier.png';
import chanel from '@/assets/images/chanel.png';
import bvlgari from '@/assets/images/bvlgari.png';
import versace from '@/assets/images/versace.png';
import dior from '@/assets/images/dior.png';
import ReusableSwiper from './Swiper/Swiper';
import Video from './Video/Video';
import Category from './Category/Category';
import Reasons from './Reasons/Reasons';
import Articles from './Articles/Articles';
import Famous from './Famouse/Famous';

export default function Home() {
  const images = [
    { src: bantiffani, alt: 'tiffani' },
    { src: banbvlgari, alt: 'bvlgari' },
    { src: banversace, alt: 'versace' },
    { src: bandior, alt: 'dior' },
    { src: banchanel, alt: 'chanel' },
    { src: bancartier, alt: 'cartier' },
  ];

  const brands = [
    {
      id: 1,
      image: cartier,
      title: 'cartier',
      alt: 'cartier',
      link: 'http://localhost:3000/products?brand=Cartier',
    },
    {
      id: 2,
      image: bvlgari,
      title: 'bvlgari',
      alt: 'bvlgari',
      link: 'http://localhost:3000/products?brand=Bvlgari',
    },
    {
      id: 3,
      image: tiffani,
      title: 'tiffani',
      alt: 'tiffani',
      link: 'http://localhost:3000/products?brand=Tiffany',
    },
    {
      id: 4,
      image: versace,
      title: 'versace',
      alt: 'versace',
      link: 'http://localhost:3000/products?brand=Versace',
    },
    {
      id: 5,
      image: dior,
      title: 'dior',
      alt: 'dior',
      link: 'http://localhost:3000/products?brand=Dior',
    },
    {
      id: 6,
      image: chanel,
      title: 'chanel',
      alt: 'chanel',
      link: 'http://localhost:3000/products?brand=Chanel',
    },
  ];

  return (
    <div className="font-sahel">
      <BrandSwiper images={images} />
      <Reasons/>
    <Famous/>
      <div className="border-2 border-custom-500 bg-custom-50 rounded-xl w-[70rem] m-auto py-10 my-20">
        <h2 className="text-2xl font-bold text-center mb-6">
          {homelocalization.brands}
        </h2>
        <ReusableSwiper slides={brands} />
      </div>
      <Category />
      <Articles/>
      <Video />
    </div>
  );
}
