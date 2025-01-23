import React from "react";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";

type Props = {
  items: ProductWithRelations[];
};

const Menu = async ({ items }: Props) => {
  const locale = await getCurrentLocale();
  const { noProductsFound } = await getTrans(locale);

  if (items.length === 0)
    return <p className="text-accent text-center">{noProductsFound}</p>;

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default Menu;
