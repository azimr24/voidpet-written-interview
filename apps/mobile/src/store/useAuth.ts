import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSessionSlice, SessionSlice } from "./sessionSlice";
import { createUserSlice, UserSlice } from "./userSlice";
import { createOnboardingSlice, OnboardingSlice } from "./onboardingSlice";

type Store = SessionSlice & UserSlice & OnboardingSlice;

export const useAuth = create<Store>()(
  persist(
    (...a) => ({
      ...createSessionSlice(...a),
      ...createUserSlice(...a),
      ...createOnboardingSlice(...a),
    }),
    { name: "auth", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
