import React from "react";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";

type Props = {
  items: ProductWithRelations[];
};

const Menu = ({ items }: Props) => {
  if (items.length === 0)
    return <p className="text-accent text-center">No products found</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Menu;
