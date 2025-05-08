import Image from 'next/image'
import React from 'react'
import fail from '@/assets/images/fail.gif'
import { paymentlocalization } from '@/constants/localization/localization'

export default function PaymentFailure() {
  return (
    <div>
      <div className='w-full m-auto'>
             <Image className='m-auto mt-40' src={fail} alt="fail" width={250} height={250} />
             <p className='text-2xl font-sahel font-bold mt-8 text-center'>{paymentlocalization.fails}.</p>
           </div>
    </div>
  )
}
