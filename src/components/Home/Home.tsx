
import React from 'react'
import BrandSwiper from './Swiper/Swiper';
import banbvlgari from '@/assets/images/banerbvlgari.png'
import bantiffani from '@/assets/images/banertiffani.png'
import bandior from '@/assets/images/banerdior.png'
import banchanel from '@/assets/images/banerchanel.png'
import banversace from '@/assets/images/banerversace.png'
import bancartier from '@/assets/images//banercartier.png';
import Image from 'next/image';
import {homelocalization} from '@/constants/localization/localization';
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



export default function Home() {

  const images = [
    { src: banversace, alt: 'versace' },
    { src: bantiffani, alt: 'tiffani' },
    { src: banbvlgari, alt: 'bvlgari' },
    { src: bandior , alt: 'dior' },
    { src: banchanel, alt: 'chanel' },
    { src: bancartier, alt: 'cartier' },
  ];

  const brands = [
    { src: cartier, alt: 'cartier', link: '/' },
    { src: bvlgari, alt: 'bvlgari', link: '/' },
    { src: tiffani, alt: 'tiffani', link: '/' },
    { src: versace, alt: 'versace', link: '/' },
    { src: dior, alt: 'dior', link: '/' },
    { src: chanel, alt: 'chanel', link: '/' },
  ];


  const reasons = [
    {
      icon: express,
      title: homelocalization.express ,
      desc: homelocalization.expresstext,
    },
    {
      icon: payment,
      title:homelocalization.payment ,
      desc: homelocalization.paymenttext ,
    },
    {
      icon: support,
      title: homelocalization.support,
      desc: homelocalization.supporttext,
    },
    {
      icon: quality,
      title:homelocalization.quality ,
      desc: homelocalization.qualitytext,
    },
  ]

  return (
    <div className="font-sahel">
      <BrandSwiper images={images} />
      <section className="pt-16 px-4 bg-white rounded-2xl max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">
          {homelocalization.whyus}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-custom-50 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="w-24 h-24 mb-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={120}
                  height={120}
                  className="w-full h-full rounded-xl object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <BrandSwiper containerClassName="h-[5rem]" images={brands} />
      <div className="flex justify-center items-center gap-20 px-56 py-14 ">
        <div className=" leading-relaxed">
          <h2 className="font-semibold text-2xl mb-7">
            {homelocalization.aika1}
          </h2>
          <p className='mb-4'>{homelocalization.aika2}</p>
          <p className='mb-4'>{homelocalization.aika3}</p>
          <p className='mb-4'>{homelocalization.aika4}</p>
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
