import { CartItem } from "@/store/cart-slice";

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getItemQuantity = (cart: CartItem[], id: string) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    const extrasTotal = item.extras?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0
    );

    const itemTotal =
      item.basePrice + (extrasTotal || 0) + (item.size?.price || 0);

    return total + itemTotal * item.quantity!;
  }, 0);
};
