"use client";

import { useStore } from "@/store/store";

const CartItems = () => {
  const items = useStore((state) => state.items);
  console.log("items", items);
  return <div>CartItems</div>;
};

export default CartItems;
