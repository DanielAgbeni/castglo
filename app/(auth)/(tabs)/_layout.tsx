import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import React, { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ROLE_TABS } from '../../../lib/role-tabs';
import { useAppStore } from '../../../store';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

const ALL_SCREEN_NAMES = [
	'dashboard',
	'profile',
	'search',
	'submit',
	'messages',
	'virtual-assistant',
	'my-projects',
	'create-casting-call',
	'submissions',
	'services',
	'browse-talents',
	'booking',
];

function RoleTabBar({ state, descriptors, navigation }: any) {
	const activeRole = useAppStore((s) => s.getActiveRole());
	const tabs = ROLE_TABS[activeRole];
	const tabNames = useMemo(() => new Set(tabs.map((t) => t.name)), [tabs]);

	return (
		<View className="flex-row bg-white border-t border-gray-200 h-[80px] pb-6">
			{state.routes
				.filter((route: any) => tabNames.has(route.name))
				.map((route: any) => {
					const tab = tabs.find((t) => t.name === route.name)!;
					const realIndex = state.routes.findIndex(
						(r: any) => r.key === route.key,
					);
					const focused = state.index === realIndex;

					return (
						<TouchableOpacity
							key={route.key}
							className="flex-1 items-center justify-center"
							onPress={() => {
								const event = navigation.emit({
									type: 'tabPress',
									target: route.key,
									canPreventDefault: true,
								});
								if (!focused && !event.defaultPrevented) {
									navigation.navigate(route.name);
								}
							}}
							activeOpacity={0.7}>
							<tab.Icon
								color={focused ? '#4F46E5' : '#000'}
								size={24}
							/>
						</TouchableOpacity>
					);
				})}
		</View>
	);
}

export default function TabsLayout() {
	const activeRole = useAppStore((s) => s.getActiveRole());
	const tabs = ROLE_TABS[activeRole];

	return (
		<MaterialTopTabs
			key={activeRole}
			tabBarPosition="bottom"
			tabBar={(props: any) => <RoleTabBar {...props} />}
			screenOptions={{
				swipeEnabled: false,
			}}>
			{/* Role tabs first — these determine the initial/visible order */}
			{tabs.map(({ name, title }) => (
				<MaterialTopTabs.Screen key={name} name={name} options={{ title }} />
			))}
			{/* Remaining screens declared but inaccessible */}
			{ALL_SCREEN_NAMES.filter(
				(n) => !tabs.some((t) => t.name === n),
			).map((name) => (
				<MaterialTopTabs.Screen key={name} name={name} />
			))}
		</MaterialTopTabs>
	);
}
