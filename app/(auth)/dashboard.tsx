import { FlashList } from '@shopify/flash-list';
import { Medal, Zap } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TextComponent from '../../components/TextComponent';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import OpportunityCard from '../../components/dashboard/OpportunityCard';
import StatsCard from '../../components/dashboard/StatsCard';

// Mock data for opportunities
const OPPORTUNITIES = [
	{
		id: '1',
		title: 'Lead Role - Indie Drama',
		daysLeft: 2,
		image:
			'https://images.unsplash.com/photo-1542206395-9feb3edaa68d?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image (forest/drama vibe)
	},
	{
		id: '2',
		title: 'Commercial - Fast Food Brand',
		daysLeft: 5,
		image:
			'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image (office/commercial vibe)
	},
	{
		id: '3',
		title: 'Music Video - Pop Artist',
		daysLeft: 3,
		image:
			'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Example image (urban/music vibe)
	},
];

export default function Dashboard() {
	const handlePress = useCallback((title: string) => {
		console.log(`Pressed: ${title}`);
	}, []);

	const renderHeader = () => (
		<View>
			{/* Stats Row */}
			<View className="flex-row justify-between mb-8 gap-x-4">
				<StatsCard
					title="Submissions"
					count={12}
					Icon={Zap}
					iconColor="#0891b2"
					bgColor="#EEFAFF"
				/>
				<StatsCard
					title="Bookings"
					count={3}
					Icon={Medal}
					iconColor="#a855f7"
					bgColor="#FFF0FA"
				/>
			</View>

			{/* Opportunities Section Header */}
			<TextComponent className="text-xl font-bold mb-4">
				Upcoming Opportunities
			</TextComponent>
		</View>
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: '#fff' }}
			edges={['top']}>
			<View style={styles.container}>
				<View className="bg-white px-5 py-4 pb-4">
					<DashboardHeader
						userName="Back"
						notificationCount={3}
					/>
				</View>
				<FlashList
					data={OPPORTUNITIES}
					renderItem={({ item }) => (
						<OpportunityCard
							title={item.title}
							daysLeft={item.daysLeft}
							image={item.image}
							onPress={() => handlePress(item.title)}
						/>
					)}
					ListHeaderComponent={renderHeader}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#AFEEEE', // Specific teal background from request
	},
	scrollContent: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		paddingTop: 20,
	},
});
