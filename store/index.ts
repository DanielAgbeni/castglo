import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../types';

interface AppState {
	hasFinishedOnboarding: boolean;
	isAuthenticated: boolean;
	token: string | null;
	user: User | null;
	setHasFinishedOnboarding: (status: boolean) => void;
	setAuthenticated: (status: boolean) => void;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	logout: () => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			hasFinishedOnboarding: false,
			isAuthenticated: false,
			token: null,
			user: null,
			setHasFinishedOnboarding: (status) =>
				set({ hasFinishedOnboarding: status }),
			setAuthenticated: (status) => set({ isAuthenticated: status }),
			setToken: (token) => set({ token }),
			setUser: (user) => set({ user }),
			logout: () => set({ isAuthenticated: false, token: null, user: null }),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
