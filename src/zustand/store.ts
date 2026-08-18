import { create } from "zustand";
import { createUserSlice, UserSlice } from "./slices/user.slice";
import { devtools } from "zustand/middleware";
export const useStore = create<UserSlice>()(
  devtools(
    (...args) => ({
      ...createUserSlice(...args),
    }),
    {
      name: "user",
    },
  ),
);
