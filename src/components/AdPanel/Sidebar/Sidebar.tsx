import React from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { AiOutlineProduct } from 'react-icons/ai';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { FaUsers } from 'react-icons/fa';
import { TiDocumentText } from 'react-icons/ti';
import { MdOutlineLogout } from 'react-icons/md';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className=" h-screen px-8 py-6 flex flex-col justify-center overflow-hidden ">
      <div className="h-screen w-full bg-custom-100 rounded-3xl shadow-xl flex flex-col justify-evenly gap-20 text-2xl items-center ">
        <div className="flex flex-col items-center justify-center gap-16">
          <Link href="homeAd">
            <AiOutlineHome />
          </Link>
          <Link href="productAd">
          <AiOutlineProduct />
          </Link>
          <Link href="productQuallity">
          <TiDocumentText />
          </Link>
          <Link href="orders">
          <HiOutlineClipboardDocumentList />
          </Link>
          <Link href="users">
          <FaUsers />
          </Link>
        </div>
        <MdOutlineLogout />
      </div>
    </div>
  );
}
