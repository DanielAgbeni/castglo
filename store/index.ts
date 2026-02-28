import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User, UserRole } from '../types';

interface AppState {
	hasFinishedOnboarding: boolean;
	isAuthenticated: boolean;
	token: string | null;
	user: User | null;
	devRoleOverride: UserRole | null;
	setHasFinishedOnboarding: (status: boolean) => void;
	setAuthenticated: (status: boolean) => void;
	setToken: (token: string | null) => void;
	setUser: (user: User | null) => void;
	setDevRoleOverride: (role: UserRole | null) => void;
	getActiveRole: () => UserRole;
	logout: () => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			hasFinishedOnboarding: false,
			isAuthenticated: false,
			token: null,
			user: null,
			devRoleOverride: null,
			setHasFinishedOnboarding: (status) =>
				set({ hasFinishedOnboarding: status }),
			setAuthenticated: (status) => set({ isAuthenticated: status }),
			setToken: (token) => set({ token }),
			setUser: (user) => set({ user }),
			setDevRoleOverride: (role) => set({ devRoleOverride: role }),
			getActiveRole: () => get().devRoleOverride ?? get().user?.role ?? 'talent',
			logout: () => set({ isAuthenticated: false, token: null, user: null }),
		}),
		{
			name: 'app-storage',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
