import React from 'react'
import siz from '@/assets/images/size-of-ring-necklace-bracelet.png';
import color from '@/assets/images/whatcolor.png';
import jewerly from '@/assets/images/whatjewerly.png';
import { homelocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import Link from 'next/link';

export default function Articles() {
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
    <div>
      <section className="py-10 px-6 border-2 border-custom-500 bg-custom-50 rounded-xl mt-32 m-auto w-[70rem]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {homelocalization.beautyblogs}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </div>
  );
}
