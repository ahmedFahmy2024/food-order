import { CartItem } from "@/store/cart-slice";

const deliveryFee = 5;

export const getCartQuantity = (cart: CartItem[] | undefined | null) => {
  if (!cart) return 0;
  return cart.reduce((quantity, item) => (item.quantity || 0) + quantity, 0);
};

export const getItemQuantity = (
  cart: CartItem[] | undefined | null,
  id: string
) => {
  if (!cart) return 0;
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: CartItem[] | undefined | null) => {
  if (!cart) return 0;
  return cart.reduce((total, item) => {
    const extrasTotal = item.extras?.reduce(
      (sum, extra) => sum + (extra.price || 0),
      0
    );

    const itemTotal =
      item.basePrice + (extrasTotal || 0) + (item.size?.price || 0);

    return total + itemTotal * (item.quantity || 1);
  }, 0);
};

export const getTotalAmount = (cart: CartItem[] | undefined | null) => {
  return getSubTotal(cart) + deliveryFee;
};
