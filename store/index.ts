import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AppState {
	hasFinishedOnboarding: boolean;
	isAuthenticated: boolean;
	setHasFinishedOnboarding: (status: boolean) => void;
	setAuthenticated: (status: boolean) => void;
	// Add more state here
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			hasFinishedOnboarding: false,
			isAuthenticated: false,
			setHasFinishedOnboarding: (status) =>
				set({ hasFinishedOnboarding: status }),
			setAuthenticated: (status) => set({ isAuthenticated: status }),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
