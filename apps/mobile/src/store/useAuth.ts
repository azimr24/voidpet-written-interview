import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSessionSlice, SessionSlice } from "./sessionSlice";
import { createUserSlice, UserSlice } from "./userSlice";

type Store = SessionSlice & UserSlice;

export const useAuth = create<Store>()(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
      ...createUserSlice(...a),
    }),
    { name: "auth", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
