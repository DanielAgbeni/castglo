import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import {
	FileText,
	LayoutDashboard,
	MessageSquare,
	Search,
	UserPen,
	Video,
} from 'lucide-react-native';
import React from 'react';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext(Navigator);

export default function TabsLayout() {
	return (
		<MaterialTopTabs
			tabBarPosition="bottom"
			screenOptions={{
				tabBarShowLabel: false,
				tabBarIndicatorStyle: { display: 'none' },
				tabBarStyle: {
					backgroundColor: '#fff',
					borderTopWidth: 1,
					borderTopColor: '#e5e5e5',
					height: 60,
					elevation: 0,
					shadowOpacity: 0,
				},
				swipeEnabled: true,
			}}>
			<MaterialTopTabs.Screen
				name="dashboard"
				options={{
					title: 'Dashboard',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<LayoutDashboard
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
			<MaterialTopTabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<UserPen
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
			<MaterialTopTabs.Screen
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<Search
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
			<MaterialTopTabs.Screen
				name="submit"
				options={{
					title: 'Submit',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<FileText
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
			<MaterialTopTabs.Screen
				name="messages"
				options={{
					title: 'Messages',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<MessageSquare
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
			<MaterialTopTabs.Screen
				name="virtual-assistant"
				options={{
					title: 'Virtual Assistant',
					tabBarIcon: ({
						color,
						focused,
					}: {
						color: string;
						focused: boolean;
					}) => (
						<Video
							color={focused ? '#4F46E5' : '#000'}
							size={24}
						/>
					),
				}}
			/>
		</MaterialTopTabs>
	);
}
