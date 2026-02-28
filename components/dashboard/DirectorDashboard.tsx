import { FlashList } from '@shopify/flash-list';
import { Star, Zap } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';
import CastingCallCard from './CastingCallCard';
import StatsCard from './StatsCard';

const CASTING_CALLS = [
	{
		id: '1',
		title: 'Lead Role - Indie Drama',
		status: 'Open' as const,
		description:
			'Seeking passionate actor for lead role in upcoming indie drama about family relationships.',
		submissions: 24,
		deadline: '15/01/2024',
		createdDate: '1/1/2024',
	},
	{
		id: '2',
		title: 'Supporting Actor - Netflix Series',
		status: 'Open' as const,
		description:
			'Looking for diverse talent for national tech commercial campaign.',
		submissions: 38,
		deadline: '20/01/2024',
		createdDate: '1/1/2024',
	},
	{
		id: '3',
		title: 'Commercial - Tech Brand',
		status: 'Closed' as const,
		description:
			'Looking for diverse talent for national tech commercial campaign.',
		submissions: 18,
		deadline: '1/10/2024',
		createdDate: '12/20/2023',
	},
];

export default function DirectorDashboard() {
	const handleView = useCallback((title: string) => {
		console.log(`View: ${title}`);
	}, []);

	const handleManage = useCallback((title: string) => {
		console.log(`Manage: ${title}`);
	}, []);

	const renderHeader = () => (
		<View>
			<View className="flex-row justify-between mb-8 gap-x-4">
				<StatsCard
					title="Total Submissions"
					count={127}
					Icon={Zap}
					iconColor="#0891b2"
					bgColor="#EEFAFF"
				/>
				<StatsCard
					title="Pending Review"
					count={21}
					Icon={Star}
					iconColor="#a855f7"
					bgColor="#F5F0FF"
				/>
			</View>

			<TextComponent className="text-xl font-bold mb-4">
				Active Casting Calls
			</TextComponent>
		</View>
	);

	return (
		<FlashList
			data={CASTING_CALLS}
			renderItem={({ item }) => (
				<CastingCallCard
					title={item.title}
					status={item.status}
					description={item.description}
					submissions={item.submissions}
					deadline={item.deadline}
					createdDate={item.createdDate}
					onView={() => handleView(item.title)}
					onManage={() => handleManage(item.title)}
				/>
			)}
			ListHeaderComponent={renderHeader}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 20,
				paddingBottom: 20,
				paddingTop: 20,
			}}
		/>
	);
}
