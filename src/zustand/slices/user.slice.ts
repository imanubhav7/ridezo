import { IUser } from "@/models/user.model";
import { StateCreator } from "zustand";

export interface UserSlice {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  removeUser: () => void;
}
export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
});
