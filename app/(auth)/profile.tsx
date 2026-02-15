import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BasicInfoTab from '@/components/profile/BasicInfoTab';
import EducationTab from '@/components/profile/EducationTab';
import PhysicalTab from '@/components/profile/PhysicalTab';
import PortfolioTab from '@/components/profile/PortfolioTab';
import SkillsTab from '@/components/profile/SkillsTab';

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: 'white' }}
			edges={['top']}>
			<View className="px-4 py-3 border-b border-gray-200 flex-row justify-between items-center bg-white">
				<Text className="text-xl font-bold text-gray-900">Profile Setting</Text>
				{/* Placeholder for the icon in the top right, if needed later */}
			</View>
			<Tab.Navigator
				screenOptions={{
					tabBarScrollEnabled: true,
					tabBarLabelStyle: {
						fontSize: 12,
						textTransform: 'none',
						fontWeight: '600',
					},
					tabBarItemStyle: {
						width: 'auto',
						paddingHorizontal: 20,
					},
					tabBarIndicatorStyle: {
						backgroundColor: '#00ced1', // approximate teal color for indicator
						height: 3,
					},
					tabBarStyle: {
						backgroundColor: 'white',
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 1,
						borderBottomColor: '#f0f0f0',
					},
					tabBarActiveTintColor: 'black',
					tabBarInactiveTintColor: 'gray',
				}}>
				<Tab.Screen
					name="Basic Info"
					component={BasicInfoTab}
				/>
				<Tab.Screen
					name="Physical"
					component={PhysicalTab}
				/>
				<Tab.Screen
					name="Skills"
					component={SkillsTab}
				/>
				<Tab.Screen
					name="Education"
					component={EducationTab}
				/>
				<Tab.Screen
					name="Portfolio"
					component={PortfolioTab}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
}
