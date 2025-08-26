import { StateCreator } from "zustand";

export interface SessionSlice {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const createSessionSlice: StateCreator<SessionSlice> = (set) => ({
  token: null,
  setToken: (token) => set({ token }),
  clearToken: () => set({ token: null }),
});
