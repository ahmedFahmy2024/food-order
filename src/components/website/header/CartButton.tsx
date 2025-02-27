"use client";
import Link from "@/components/Link/Link";
import { Routes } from "@/constants/enum";
import { getCartQuantity } from "@/lib/cart";
import { useStore } from "@/store/store";
import { ShoppingCartIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CartButton = () => {
  const [mounted, setMounted] = useState(false);
  const items = useStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const amount = mounted ? getCartQuantity(items) : 0;

  return (
    <Link href={`/${Routes.CART}`} className="block relative group">
      <span className="absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        {amount}
      </span>
      <ShoppingCartIcon className="text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6" />
    </Link>
  );
};

export default CartButton;
