import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/logo.png';
import { footerlocalization } from '@/constants/localization/localization';
import Link from 'next/link';

export default function WebFooter() {
  return (
    <div className="bg-black w-full p-5 flex flex-col justify-center items-center gap-8 font-sahel mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={logo} alt="logo" width={50} />
        <p className="text-4xl pb-1 font-serif text-white">Aika gallery</p>
      </div>
      <div className="flex justify-center items-start gap-48">
        <div className="text-white mt-10 leading-loose text-sm">
          <p>{footerlocalization.text1}</p>
          <p>{footerlocalization.text2}</p>
          <p>{footerlocalization.text3}</p>
          <p>{footerlocalization.text4}</p>
          <p>{footerlocalization.text5}</p>
          <p>{footerlocalization.text6}</p>
          <p>{footerlocalization.text7}</p>
          <p>{footerlocalization.text8}</p>
        </div>
        <div className="text-white flex flex-col text-sm gap-2">
          <h1 className="font-bold text-xl mb-2">
            {footerlocalization.quiklyaccess}
          </h1>
          <Link href="/about">{footerlocalization.aboutus}</Link>
          <Link href="/contact">{footerlocalization.contact}</Link>
          <Link href="brands">{footerlocalization.brands}</Link>
          <Link href="/orderTrack">{footerlocalization.Ordertracking}</Link>
        </div>
        <div className="text-white flex flex-col text-sm gap-2">
          <h1 className="font-bold text-xl mb-1 mt-1">
            {footerlocalization.conect}
          </h1>
          <p>{footerlocalization.address}</p>
          <p>{footerlocalization.address1}</p>
          <p>{footerlocalization.supporttime}</p>
          <p>{footerlocalization.time}</p>
          <p>6789 345 912 (+98)</p>
        </div>
      </div>
    </div>
  );
}
