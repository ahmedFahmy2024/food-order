import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import AddToCartBtn from "./AddToCartBtn";
import { ProductWithRelations } from "@/types/product";

type Props = {
  item: ProductWithRelations;
};

const MenuItem = ({ item }: Props) => {
  return (
    <li>
      <div className="relative w-48 h-48 mx-auto">
        <Image className="object-cover" src={item.image} alt="pizza" fill />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{item.name}</h4>
        <strong className="text-accent">
          {formatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
      <AddToCartBtn item={item} />
    </li>
  );
};

export default MenuItem;
