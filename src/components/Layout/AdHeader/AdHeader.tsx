import { headerlocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import Link from 'next/link';
import React from 'react';
import { BsBell } from 'react-icons/bs';
import { IoMoonOutline } from 'react-icons/io5';
import { MdLanguage } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';

export default function AdHeader() {
  return (
    <div className="flex justify-between items-center pl-8 py-6 text-custom-500 font-sahel">
      <div>
        <Input
          name="searchAdmin"
          type="search"
          value={undefined}
          className="border-2 border-custom-100 w-56 h-9 p-2 text-xs outline-none focus:border-2 focus:border-custom-500 rounded-3xl"
          placeholder={headerlocalization.search}
        />
      </div>

      <div className="flex flex-row-reverse items-center justify-center text-xl gap-8">
        <Link href="profile">
          <FaRegUserCircle />
        </Link>
          <BsBell />
          <IoMoonOutline />
          <MdLanguage />
      </div>
    </div>
  );
}
