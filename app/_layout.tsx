import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css';
import { useAppStore } from '../store';

export default function RootLayout() {
	const { isAuthenticated } = useAppStore();
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

		if (isAuthenticated && !inAuthGroup) {
			router.replace('/(auth)/dashboard');
		} else if (!isAuthenticated) {
			const { hasFinishedOnboarding } = useAppStore.getState();
			if (!hasFinishedOnboarding && segments[0] !== '(public)') {
				router.replace('/(public)/onboarding');
			} else if (hasFinishedOnboarding && inAuthGroup) {
				router.replace('/(public)/welcome');
			}
		}
	}, [isAuthenticated, segments, isMounted]);

	if (!isMounted) return null;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Slot screenOptions={{ contentStyle: { backgroundColor: '#AFEEEE' } }} />
		</GestureHandlerRootView>
	);
}
