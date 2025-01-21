import { Extra, Size } from "@prisma/client";
import { StateCreator } from "zustand";

export type CartItem = {
  name: string;
  id: string;
  image: string;
  basePrice: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type CartState = {
  items: CartItem[];
};

type CartAction = {
  addCartItem: (item: CartItem) => void;
  removeCartItem: (id: string) => void;
  removeItemFromCart: (id: string) => void;
  clearCart: () => void;
};

export type CartSlice = CartState & CartAction;

const initialCart = localStorage.getItem("cart");

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartSlice
> = (set) => ({
  items: initialCart ? JSON.parse(initialCart) : [],
  addCartItem: (newItem: CartItem) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 0) + 1;
        existingItem.size = newItem.size || existingItem.size;
        existingItem.extras = newItem.extras || existingItem.extras;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    });
  },

  removeCartItem: (id: string) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
    });
  },

  removeItemFromCart: (id: string) => {
    set((state) => {
      state.items = state.items.filter((item) => item.id !== id);
    });
  },

  clearCart: () => {
    set((state) => {
      state.items = [];
    });
  },
});
