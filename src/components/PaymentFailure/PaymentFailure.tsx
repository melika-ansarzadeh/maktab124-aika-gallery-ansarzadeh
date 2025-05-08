import Image from 'next/image'
import React from 'react'
import fail from '@/assets/images/fail.gif'
import { paymentlocalization } from '@/constants/localization/localization'
import Link from 'next/link';

export default function PaymentFailure() {
  return (
    <div>
      <div className="w-full m-auto">
        <Image
          className="m-auto mt-40"
          src={fail}
          alt="fail"
          width={250}
          height={250}
        />
        <p className="text-2xl font-sahel font-bold mb-10 text-center">
          {paymentlocalization.fails}.
        </p>
        <Link
          className="bg-red-500 p-3 rounded-lg text-white active:scale-95 text-sm font-semibold mr-[43rem]"
          href="/"
        >
          {paymentlocalization.back}
        </Link>
      </div>
    </div>
  );
}
