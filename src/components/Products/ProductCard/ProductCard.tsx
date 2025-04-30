import { IoCartOutline, IoHeartOutline } from "react-icons/io5";

export default function ProductCard() {
  return (
    <div className="bg-custom-50 border border-custom-200 px-6 pt-6 pb-10 text-center hover:shadow-lg hover:scale-105 transition font-number">
      <div className="w-full h-56 bg-white border border-custom-200 mb-4">
        <img className=" w-32 rounded-md" src="" alt="" />
      </div>
      <h4 className="font-sahel text-sm mb-2">نام محصول</h4>
      <p className="text-custom-500 font-medium text-sm mb-3 font-number">130,000</p>
      <div className="flex justify-center gap-3 text-lg">
        <button>
          <IoHeartOutline />
        </button>
        <button>
          <IoCartOutline />
        </button>
      </div>
    </div>
  );
}
