import { filterlocalization } from '@/constants/localization/localization';
import React from 'react'

export default function FilterProduct() {
  return (
    <aside className="bg-custom-50 border border-custom-200 h-[54rem] p-5 shadow-sm text-sm font-sahel">
      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.category}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button>{filterlocalization.necklace}</button>
        <button>{filterlocalization.earings}</button>
        <button>{filterlocalization.ring}</button>
        <button>{filterlocalization.bracelet}</button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.brand}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button>{filterlocalization.bvlgari}</button>
        <button>{filterlocalization.tifany}</button>
        <button>{filterlocalization.cartier}</button>
        <button>{filterlocalization.versace}</button>
        <button>{filterlocalization.dior}</button>
        <button>{filterlocalization.chanel}</button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.price}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button>{filterlocalization.expensive}</button>
        <button>{filterlocalization.cheap}</button>
      </div>
    </aside>
  );
}
