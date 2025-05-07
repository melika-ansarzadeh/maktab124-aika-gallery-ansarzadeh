'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import './Swiperr.css'

type SlideItem = {
  id: number;
  title?: string;
  image: StaticImageData;
  alt: string;
  link: string;
};


type Props = {
  slides: SlideItem[];
};

const ReusableSwiper = ({ slides }: Props) => {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={25}
        navigation
        direction={
          typeof window !== 'undefined' && window.innerWidth <= 760
            ? 'vertical'
            : 'horizontal'
        }
        onResize={swiper => {
          swiper.changeDirection(
            window.innerWidth <= 760 ? 'vertical' : 'horizontal'
          );
        }}
        className="w-full"
      >
        {slides.map(item => (
          <SwiperSlide key={item.id}>
            <Link href={item.link}> 
              <div className="rounded overflow-hidden m-auto mt-8 transition">
                <Image
                  src={item.image}
                  alt={item.alt}
                  title={item.title}
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />

                <div className="p-2 text-center text-white text-sm font-medium">
                  {item.title}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReusableSwiper;
