import { StateCreator } from "zustand";

export interface UserSlice {
  user: { id: string; displayName: string } | null;
  setUser: (user: { id: string; displayName: string } | null) => void;
  clearUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
});
