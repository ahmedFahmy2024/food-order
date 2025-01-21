import { Store } from "@/types/store";
import { create } from "zustand";
import { createCartSlice } from "./cart-slice";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    immer((...a) => ({
      ...createCartSlice(...a),
    })),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
