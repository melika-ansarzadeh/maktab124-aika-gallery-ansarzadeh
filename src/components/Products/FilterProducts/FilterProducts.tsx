import { filterlocalization } from "@/constants/localization/localization";

interface FilterProductProps {
  setFilters: (filters: any) => void;
}

export default function FilterProduct({ setFilters }: FilterProductProps) {
  return (
    <aside className="bg-custom-50 border border-custom-200 h-[54rem] p-5 shadow-sm text-sm font-sahel">
      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">
        {filterlocalization.category}:
      </h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button onClick={() => setFilters((prev: any) => ({ ...prev, category: 'necklace' }))}>
          {filterlocalization.necklace}
        </button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, category: 'earrings' }))}>
          {filterlocalization.earings}
        </button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, category: 'ring' }))}>{filterlocalization.ring}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, category: 'bracelet' }))}>
          {filterlocalization.bracelet}
        </button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">{filterlocalization.brand}:</h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Bvlgari' }))}>{filterlocalization.bvlgari}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Tiffany' }))}>{filterlocalization.tifany}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Cartier' }))}>{filterlocalization.cartier}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Versace' }))}>{filterlocalization.versace}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Dior' }))}>{filterlocalization.dior}</button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, brand: 'Chanel' }))}>{filterlocalization.chanel}</button>
      </div>

      <h3 className="text-lg text-[#663819] font-medium mb-3 mt-7">{filterlocalization.price}:</h3>
      <div className="flex flex-col gap-3 items-start text-sm">
        <button onClick={() => setFilters((prev: any) => ({ ...prev, sort: '-price' }))}>
         {filterlocalization.expensive}
        </button>
        <button onClick={() => setFilters((prev: any) => ({ ...prev, sort: 'price' }))}>
          {filterlocalization.cheap}
        </button>
      </div>
    </aside>
  );
}
