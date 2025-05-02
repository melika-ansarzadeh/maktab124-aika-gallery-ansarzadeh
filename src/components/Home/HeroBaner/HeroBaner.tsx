'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeroBaner.css';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

interface SwiperProps {
  images: {
    src: any;
    alt: string;
    link?: string;
  }[];
  containerClassName?: string;
}

export default function BrandSwiper({
  images,
  containerClassName = '',
}: SwiperProps) {
  return (
    <Swiper
      style={{ height: '33rem' }}
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className={`mySwiper ${containerClassName}`}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          {image.link ? (
            <div className="w-full h-[38rem] relative">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              quality={100}
              className="object-cover"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
