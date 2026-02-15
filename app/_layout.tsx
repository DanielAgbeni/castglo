import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import '../global.css';
import { useAppStore } from '../store';

export default function RootLayout() {
	const { isAuthenticated, token, user } = useAppStore();
	const segments = useSegments();
	const router = useRouter();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		// TEMP: Force onboarding to show on reload
		useAppStore.getState().setHasFinishedOnboarding(false);
	}, []);

	useEffect(() => {
		if (!isMounted) return;

		const inAuthGroup = segments[0] === '(auth)';
		const hasAuth = isAuthenticated && token && user;

		if (hasAuth && !inAuthGroup) {
			router.replace('/(auth)/(tabs)/dashboard');
		} else if (!hasAuth) {
			const { hasFinishedOnboarding } = useAppStore.getState();
			if (inAuthGroup) {
				router.replace('/(public)/login');
			} else if (!hasFinishedOnboarding && segments[0] !== '(public)') {
				router.replace('/(public)/onboarding');
			} else if (hasFinishedOnboarding && inAuthGroup) {
				router.replace('/(public)/welcome');
			}
		}
	}, [isAuthenticated, token, user, segments, isMounted]);

	if (!isMounted) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastProvider>
				<Slot
					screenOptions={{ contentStyle: { backgroundColor: '#AFEEEE' } }}
				/>
			</ToastProvider>
		</GestureHandlerRootView>
	);
}
