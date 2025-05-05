import { homelocalization } from '@/constants/localization/localization';
import Image from 'next/image';
import React from 'react'
import express from '@/assets/images/express.png';
import payment from '@/assets/images/safepayment.png';
import support from '@/assets/images/support2.png';
import quality from '@/assets/images/quality.png';

export default function Reasons() {
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
  return (
    <div>
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
              <Image
                src={item.icon}
                alt={item.title}
                width={300}
                height={600}
                className="w-24 h-auto object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
