 import Image from 'next/image';
import React from 'react'
import success from '@/assets/images/success.gif'
import { paymentlocalization } from '@/constants/localization/localization';
 
 export default function PaymentSuccess() {
   return (
     <div className='w-full m-auto'>
       <Image className='m-auto mt-40' src={success} alt="success" width={200} height={200} />
       <p className='text-2xl font-sahel font-bold mt-14 text-center'>{paymentlocalization.success}.</p>
     </div>
   );
 }
 