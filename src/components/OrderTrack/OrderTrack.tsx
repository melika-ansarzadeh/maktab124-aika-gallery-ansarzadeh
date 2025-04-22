import { ordertracklocalization } from '@/constants/localization/localization'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import order from './../../assets/images/ordertracking.png'

export default function OrderTrack() {
  return (
    <div className="w-[60rem] m-auto h-[30rem] bg-custom-75 flex flex-col justify-items items-center gap-10">
        <Image 
        src={order}
        alt='order'
        width={330}
    />

      <p className="font-bold text-2xl">{ordertracklocalization.text}</p>
      <Link
        className="text-custom-500 font-semibold text-lg underline"
        href="https://tracking.post.ir/"
      >
        {ordertracklocalization.click}
      </Link>
    </div>
  );
}
