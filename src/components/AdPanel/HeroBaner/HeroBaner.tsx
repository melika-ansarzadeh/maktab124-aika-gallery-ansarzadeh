import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import './style.css';
import { Pagination, Navigation } from 'swiper/modules';
import dior from '@/assets/images/bgdior.png'
import chanel from '@/assets/images/bgchanel.png';
import tiffani from '@/assets/images/bgtiffany.png';
import versace from '@/assets/images/bgversace.png';
import bvlgari from '@/assets/images/bgbvlgari.png';
import cartier from '@/assets/images/bgdior.png';
import Image from 'next/image';

export default function HeoBaner() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={dior} alt="dior" quality={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={chanel} alt="chanel" quality={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={tiffani} alt="tiffani" quality={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={versace} alt="versace" quality={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={bvlgari} alt="bvlgari" quality={100} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={cartier} alt="cartier" quality={100} />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
