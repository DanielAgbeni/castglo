import TextComponent from '@/components/TextComponent';
import { FlashList } from '@shopify/flash-list';
import { DollarSign, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import BookingCard, { Booking } from './BookingCard';

const UPCOMING_BOOKINGS: Booking[] = [
	{
		id: '1',
		userName: 'Sarah Johnson',
		serviceType: 'Professional Headshot Session',
		date: '1/18/2024',
		time: '10:00 AM',
		status: 'confirmed',
		price: '$250',
	},
	{
		id: '2',
		userName: 'Michael Chen',
		serviceType: 'Portfolio Photography',
		date: '1/20/2024',
		time: '2:00 PM',
		status: 'confirmed',
		price: '$450',
	},
	{
		id: '3',
		userName: 'Emma Rodriguez',
		serviceType: 'Styling Consultation',
		date: '1/22/2024',
		time: '11:00 AM',
		status: 'pending',
		price: '$150',
	},
];

const RECENT_REQUESTS: Booking[] = [
	{
		id: '101',
		userName: 'Alex Thonpson',
		serviceType: 'Headshot Photography',
		date: '1/15/2024',
		status: 'pending',
		isRequest: true,
	},
	{
		id: '102',
		userName: 'Jordan Lee',
		serviceType: 'Makeup & Styling',
		date: '1/14/2024',
		status: 'pending',
		isRequest: true,
	},
	{
		id: '103',
		userName: 'Taylor Kim',
		serviceType: 'Portfolio Review',
		date: '1/13/2024',
		status: 'pending',
		isRequest: true,
	},
];

const IndustryProDashboard = memo(() => {
	const renderHeader = () => (
		<View className="mb-6">
			{/* Stats Row */}
			<View className="flex-row justify-between gap-x-4">
				<View className="flex-1 bg-[#EEFAFF] p-4 rounded-xl shadow-sm border border-[#D1F2FF]">
					<View className="mb-2">
						<DollarSign size={24} color="#0EA5E9" />
					</View>
					<TextComponent className="text-gray-600 text-sm mb-1">
						Revenue
					</TextComponent>
					<TextComponent className="text-2xl font-bold text-black">
						$5,240
					</TextComponent>
				</View>

				<View className="flex-1 bg-[#FFF0FA] p-4 rounded-xl shadow-sm border border-[#FDE2EC]">
					<View className="mb-2">
						<Star size={24} color="#A855F7" />
					</View>
					<TextComponent className="text-gray-600 text-sm mb-1">
						Rating
					</TextComponent>
					<TextComponent className="text-2xl font-bold text-black">
						4.9
					</TextComponent>
				</View>
			</View>
		</View>
	);

	const renderFooter = () => (
		<View className="mt-4 mb-6">
			{/* Recent Requests */}
			<TextComponent className="text-lg font-bold mb-3 text-black">
				Recent Booking Requests
			</TextComponent>
			<View>
				{RECENT_REQUESTS.map((request) => (
					<BookingCard key={request.id} booking={request} />
				))}
			</View>
		</View>
	);

	return (
		<View className="flex-1 px-4 pt-4">
			<TextComponent className="text-lg font-bold mb-3 text-black">
				Upcoming Bookings
			</TextComponent>
			<FlashList
				data={UPCOMING_BOOKINGS}
				renderItem={({ item }: { item: Booking }) => <BookingCard booking={item} />}
				ListHeaderComponent={renderHeader}
				ListFooterComponent={renderFooter}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>
		</View>
	);
});

IndustryProDashboard.displayName = 'IndustryProDashboard';

export default IndustryProDashboard;
