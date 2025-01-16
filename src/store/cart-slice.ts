import { Extra, Size } from "@prisma/client";
import { StateCreator } from "zustand";

type CartItem = {
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

type CartAction = {};

export type CartSlice = CartState & CartAction;

export const createCartSlice: StateCreator<
  CartSlice,
  [["zustand/immer", never]],
  [],
  CartState
> = (set) => ({
  items: [],
});
