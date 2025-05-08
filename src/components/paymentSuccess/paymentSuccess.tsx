 import Image from 'next/image';
import React from 'react'
import success from '@/assets/images/success.gif'
import { paymentlocalization } from '@/constants/localization/localization';
import Link from 'next/link';
 
 export default function PaymentSuccess() {
   return (
     <div className='w-full m-auto font-sahel'>
       <Image className='m-auto mt-40' src={success} alt="success" width={200} height={200} />
       <p className='text-2xl font-sahel font-bold mt-14 mb-10 text-center'>{paymentlocalization.success}.</p>
       <Link className='bg-green-500 p-3 rounded-lg text-white active:scale-95 text-sm font-semibold mr-[43rem]' href='/'>
        {paymentlocalization.back}
       </Link>
     </div>
   );
 }
 