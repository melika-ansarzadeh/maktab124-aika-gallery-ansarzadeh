import React, { useEffect, useState } from 'react';
import BrandSwiper from './HeroBaner/HeroBaner';
import banbvlgari from '@/assets/images/banerbvlgari.png';
import bantiffani from '@/assets/images/banertiffani.png';
import bandior from '@/assets/images/banerdior.png';
import banchanel from '@/assets/images/banerchanel.png';
import banversace from '@/assets/images/banerversace.png';
import bancartier from '@/assets/images//banercartier.png';
import Image from 'next/image';
import { homelocalization } from '@/constants/localization/localization';
import express from '@/assets/images/express.png';
import payment from '@/assets/images/safepayment.png';
import support from '@/assets/images/support2.png';
import quality from '@/assets/images/quality.png';
import tiffani from '@/assets/images/tiffany.png';
import cartier from '@/assets/images/cartier.png';
import chanel from '@/assets/images/chanel.png';
import bvlgari from '@/assets/images/bvlgari.png';
import versace from '@/assets/images/versace.png';
import dior from '@/assets/images/dior.png';
import Link from 'next/link';
import ReusableSwiper from './Swiper/Swiper';
import siz from '@/assets/images/size-of-ring-necklace-bracelet.png'
import color from '@/assets/images/whatcolor.png'
import jewerly from '@/assets/images/whatjewerly.png'
import wishper from '@/assets/images/wishper.png'
import coco from '@/assets/images/cococrushdiamond.png'
import necklace from '@/assets/images/crystalbutterflies.png'


export default function Home() {
  const images = [
    { src: banversace, alt: 'versace' },
    { src: bantiffani, alt: 'tiffani' },
    { src: banbvlgari, alt: 'bvlgari' },
    { src: bandior, alt: 'dior' },
    { src: banchanel, alt: 'chanel' },
    { src: bancartier, alt: 'cartier' },
  ];

  const brands = [
    { id: 1, image: cartier, title: 'cartier', alt: 'cartier', link: '/' },
    { id: 2, image: bvlgari, title: 'bvlgari', alt: 'bvlgari', link: '/' },
    { id: 3, image: tiffani, title: 'tiffani', alt: 'bvlgari', link: '/' },
    { id: 4, image: versace, title: 'versace', alt: 'bvlgari', link: '/' },
    { id: 5, image: dior, title: 'dior', alt: 'bvlgari', link: '/' },
    { id: 6, image: chanel, title: 'chanel', alt: 'bvlgari', link: '/' },
  ];

  const reasons = [
    {
      icon: express,
      title: homelocalization.express,
      desc: homelocalization.expresstext,
    },
    {
      icon: payment,
      title: homelocalization.payment,
      desc: homelocalization.paymenttext,
    },
    {
      icon: support,
      title: homelocalization.support,
      desc: homelocalization.supporttext,
    },
    {
      icon: quality,
      title: homelocalization.quality,
      desc: homelocalization.qualitytext,
    },
  ];

  const famouse = [
    {
      id: 1,
      title: homelocalization.bracelet,
      image: wishper,
      link: 'http://localhost:3000/products/67ff4ddaeada4d94453a7a66',
    },
    {
      id: 2,
      title: homelocalization.necklace,
      image: necklace,
      link: 'http://localhost:3000/products/67ffef94eada4d94453a7b3b',
    },
    {
      id: 3,
      title: homelocalization.ring,
      image: coco,
      link: 'http://localhost:3000/products/67fea70425dce380f3dc193f',
    },
  ];

  const articles = [
    {
      id: 1,
      title: homelocalization.size,
      image: siz,
      link: 'https://parasteh.com/blog/size-of-ring-necklace-bracelet/',
    },
    {
      id: 2,
      title: homelocalization.whatjewerly,
      image: color,
      link: 'https://parasteh.com/blog/jewelry-according-face-shape/',
    },
    {
      id: 3,
      title: homelocalization.whatcolor,
      image: jewerly,
      link: 'https://parasteh.com/blog/what-skin-tone-goes-with-gold/',
    },
  ];
  return (
    <div className="font-sahel">
      <BrandSwiper images={images} />
      <section className="py-16 px-4 bg-white rounded-2xl max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-5">
          {homelocalization.whyus}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-custom-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="w-24 mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={300}
                  height={600}
                  className="w-full h-full rounded-xl object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-10 px-6 border-2 border-custom-500 bg-custom-50 rounded-xl mt-20 m-auto w-[70rem]">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          {homelocalization.famuous}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {famouse.map(famouse => (
            <Link
              key={famouse.id}
              href={famouse.link}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <Image
                src={famouse.image}
                alt={famouse.title}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-base text-center font-semibold">
                  {famouse.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="border-2 border-custom-500 bg-custom-50 rounded-xl w-[70rem] m-auto py-10 my-10">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          {homelocalization.brands}
        </h2>
        <ReusableSwiper slides={brands} />
      </div>
      <section className="py-10 px-6 border-2 border-custom-500 bg-custom-50 rounded-xl mt-20 m-auto w-[70rem]">
        <h2 className="text-2xl font-bold text-center mb-6 ">
          {homelocalization.beautyblogs}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {articles.map(article => (
            <Link
              key={article.id}
              href={article.link}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <Image
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <div className="flex justify-center items-center gap-20 px-56 py-10">
        <div className=" leading-relaxed">
          <h2 className="font-semibold text-2xl mb-7">
            {homelocalization.aika1}
          </h2>
          <p className="mb-4">{homelocalization.aika2}</p>
          <p className="mb-4">{homelocalization.aika3}</p>
          <p className="mb-4">{homelocalization.aika4}</p>
        </div>
        <video
          src="/videos/hero.mp4"
          controls
          autoPlay
          muted
          loop
          className="w-[31rem] h-[36rem] rounded-xl shadow-lg"
        ></video>
      </div>
    </div>
  );
}
