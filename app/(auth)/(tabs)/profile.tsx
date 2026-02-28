import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
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
			style={{ flex: 1 }}
			edges={['top']}>
			<View className="px-4 py-3 border-b border-gray-200 flex-row justify-between items-center bg-white">
				<Text className="text-xl font-bold text-gray-900">Profile Setting</Text>
			</View>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
				<Tab.Navigator
					screenOptions={{
						tabBarScrollEnabled: true,
						tabBarLabelStyle: {
							fontSize: 14,
							textTransform: 'none',
							fontWeight: '600',
							color: '#1f2937',
						},
						tabBarItemStyle: {
							width: 'auto',
							paddingHorizontal: 16,
						},
						tabBarIndicatorStyle: {
							backgroundColor: '#AFEEEE',
							height: 3,
							borderRadius: 3,
						},
						tabBarStyle: {
							
							elevation: 2,
							shadowOpacity: 0.1,
							borderRadius: 16,
							marginHorizontal: 16,
							marginVertical: 8,
							borderWidth: 1,
							borderColor: '#e5e7eb',
							overflow: 'hidden',
						},
						tabBarActiveTintColor: '#1f2937',
						tabBarInactiveTintColor: '#6b7280',
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
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
