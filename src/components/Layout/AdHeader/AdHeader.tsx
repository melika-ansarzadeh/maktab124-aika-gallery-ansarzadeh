import { headerlocalization } from '@/constants/localization/localization';
import Input from '@/shared/Inputs/Inputs';
import React from 'react';
import { BsBell } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';



export default function AdHeader() {
 

  return (
    <div className="flex justify-between items-center pl-10 pt-6 pb-3 text-custom-500 font-sahel">
      <div>
        <Input
          name="searchAdmin"
          type="search"
          value={undefined}
          className="border-2 border-custom-100 w-56 h-9 p-2 -mr-4 text-xs outline-none focus:border-2 focus:border-custom-500 rounded-3xl"
          placeholder={headerlocalization.search}
        />
      </div>
      <div className="flex flex-row-reverse items-center justify-center text-xl gap-8">
        <BsBell />
        <MdLanguage />
      </div>
    </div>
  );
}
