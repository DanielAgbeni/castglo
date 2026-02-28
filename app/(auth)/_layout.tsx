import { Stack } from 'expo-router';
import React from 'react';
import DevRoleSwitcher from '../../components/DevRoleSwitcher';

export default function AuthLayout() {
	return (
		<>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="casting-call/[id]" />
				<Stack.Screen name="chat/[id]" />
			</Stack>
			<DevRoleSwitcher />
		</>
	);
}
