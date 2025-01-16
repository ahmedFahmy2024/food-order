import { Store } from "@/types/store";
import { create } from "zustand";
import { createCartSlice } from "./cart-slice";
import { immer } from "zustand/middleware/immer";

export const useStore = create<Store>()(
  immer((...a) => ({
    ...createCartSlice(...a),
  }))
);
