import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  displayName: string;
};

type State = {
  token: string | null;
  user: User | null;
  deviceId: string | null;
  setSession: (token: string, user: User) => void;
  setDeviceId: (deviceId: string) => void;
  clear: () => void;
};

export const useAuth = create<State>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      deviceId: null,
      setSession: (token, user) => set({ token, user }),
      setDeviceId: (id) => set({ deviceId: id }),
      clear: () => set({ token: null, user: null }),
    }),
    { name: "auth", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
