import Link from 'next/link';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { Iaddproducts } from '@/services/addProduct/addProduct';

export default function ProductCard({ data }: { data: Iaddproducts }) {
  return (
    <Link href={`/products/${data._id}`}>
      <div className="bg-custom-50 border px-6 pt-6 pb-10 text-center hover:shadow-lg hover:scale-105 transition font-number">
        <div className="w-full h-56 border mb-4 flex items-center justify-center">
          <img
            className="w-56 h-56 object-contain rounded-md"
            src={`http://${data.images}`}
            alt={data.name}
          />
        </div>
        <h4 className="font-sahel text-sm mb-2">{data.name}</h4>
        <p className="text-custom-500 font-medium text-sm mb-3 font-number">
          {Number(data.price).toLocaleString()} تومان
        </p>
        <div className="flex justify-center gap-3 text-lg">
          <button>
            <IoHeartOutline />
          </button>
          <button>
            <IoCartOutline />
          </button>
        </div>
      </div>
    </Link>
  );
}
