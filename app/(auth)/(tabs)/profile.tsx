import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BasicInfoTab from '@/components/profile/BasicInfoTab';
import EducationTab from '@/components/profile/EducationTab';
import IndustryProProfile from '@/components/profile/IndustryProProfile';
import PhysicalTab from '@/components/profile/PhysicalTab';
import PortfolioTab from '@/components/profile/PortfolioTab';
import SkillsTab from '@/components/profile/SkillsTab';
import { useAppStore } from '@/store';

const Tab = createMaterialTopTabNavigator();

export default function Profile() {
	const activeRole = useAppStore((s) => s.getActiveRole());

	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View className="bg-white px-5 py-4 pb-4">
				<View className="flex-row items-center justify-between">
					<Text className="text-2xl font-bold">Profile Setting</Text>
				</View>
			</View>
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: '#AFEEEE' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
				{activeRole === 'industry_professional' ? (
					<IndustryProProfile />
				) : (
					<Tab.Navigator
						screenOptions={{
							tabBarScrollEnabled: true,
							tabBarLabelStyle: {
								fontSize: 14,
								textTransform: 'none',
								fontWeight: '900',
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
						<Tab.Screen name="Basic Info">
							{() => <BasicInfoTab />}
						</Tab.Screen>
						<Tab.Screen name="Physical">
							{() => <PhysicalTab />}
						</Tab.Screen>
						<Tab.Screen name="Skills">
							{() => <SkillsTab />}
						</Tab.Screen>
						<Tab.Screen name="Education">
							{() => <EducationTab />}
						</Tab.Screen>
						<Tab.Screen name="Portfolio">
							{() => <PortfolioTab />}
						</Tab.Screen>
					</Tab.Navigator>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
