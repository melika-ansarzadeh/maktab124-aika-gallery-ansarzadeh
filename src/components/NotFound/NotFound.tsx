'use client';

import Link from 'next/link';
import notfound from './../../assets/images/notfound.png'
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <Image
        src={notfound}
        alt="notfound"
        width={400}
        height={200}
        quality={100}
        className="rounded-xl"
      />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">صفحه‌ای که دنبالشی پیدا نشد!</p>
      <Link
        href="/"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
      >
        برو صفحه اصلی
      </Link>
    </div>
  );
}
