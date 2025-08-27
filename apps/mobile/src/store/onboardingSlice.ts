import { StateCreator } from "zustand";

export interface OnboardingSlice {
  onboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => void;
  clearOnboardingComplete: () => void;
}

export const createOnboardingSlice: StateCreator<OnboardingSlice> = (set) => ({
  onboardingComplete: false,
  setOnboardingComplete: (value) => set({ onboardingComplete: value }),
  clearOnboardingComplete: () => set({ onboardingComplete: false }),
});
