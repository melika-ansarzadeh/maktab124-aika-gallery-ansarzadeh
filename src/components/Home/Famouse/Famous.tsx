import { homelocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import wishper from '@/assets/images/wishper.png';
import coco from '@/assets/images/cococrushdiamond.png';
import necklace from '@/assets/images/crystalbutterflies.png';

export default function Famous() {
      const famouse = [
        {
          id: 1,
          title: homelocalization.bracelet,
          image: wishper,
          link: '/products/67ff4ddaeada4d94453a7a66',
        },
        {
          id: 2,
          title: homelocalization.necklace,
          image: necklace,
          link: '/products/67ffef94eada4d94453a7b3b',
        },
        {
          id: 3,
          title: homelocalization.ring,
          image: coco,
          link: '/products/67fea70425dce380f3dc193f',
        },
      ];
  return (
    <div>
      <section className="py-10 px-6 border-2 border-custom-500 bg-custom-50 rounded-xl mt-20 m-auto w-[70rem]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {homelocalization.famuous}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {famouse.map(item => (
            <Link
              key={item.id}
              href={item.link}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <Image
                src={item.image}
                alt={item.title}
                className="w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
