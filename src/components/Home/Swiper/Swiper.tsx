'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Swiper.css';
import { Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

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
            <Link href={image.link}>
              <Image
                src={image.src}
                alt={image.alt}
                quality={100}
                className="w-full h-auto object-cover"
              />
            </Link>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              quality={100}
              className="w-full h-auto object-cover"
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
