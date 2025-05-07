'use client';

import Link from 'next/link';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { Iaddproducts } from '@/services/addProduct/addProduct';
import { useDispatch } from 'react-redux';
import { addItem } from '@/components/redux/reducers/cartReducer';

interface ProductCardProps {
  data: Iaddproducts;
  product: {
    id: any;
    name: string;
    price: any;
    image: string;
  };
}

export default function ProductCard({ data, product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <Link href={`/products/${data._id}`}>
      <div className="bg-custom-50 border px-6 pt-6 pb-10 text-center hover:shadow-lg hover:scale-105 transition font-number">
        <div className="w-full h-56 border mb-4 flex items-center justify-center">
          <img
            className="w-56 h-56 object-contain rounded-md"
            src={product.image}
            alt={product.name}
          />
        </div>
        <h4 className="font-sahel text-sm mb-2">{product.name}</h4>
        <p className="text-custom-500 font-medium text-sm mb-3 font-number">
          {Number(product.price).toLocaleString()} تومان
        </p>
        <div className="flex justify-center gap-3 text-lg">
          <button>
            <IoHeartOutline />
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              handleAdd();
            }}
          >
            <IoCartOutline />
          </button>
        </div>
      </div>
    </Link>
  );
}
