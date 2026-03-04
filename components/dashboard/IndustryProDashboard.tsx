import TextComponent from '@/components/TextComponent';
import { DollarSign, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
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
	return (
		<ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
			{/* Stats Row */}
			<View className="flex-row justify-between mb-6 gap-x-4">
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

			{/* Upcoming Bookings */}
			<TextComponent className="text-lg font-bold mb-3 text-black">
				Upcoming Bookings
			</TextComponent>
			<View className="mb-2">
				{UPCOMING_BOOKINGS.map((booking) => (
					<BookingCard key={booking.id} booking={booking} />
				))}
			</View>

			{/* Recent Requests */}
			<TextComponent className="text-lg font-bold mb-3 mt-4 text-black">
				Recent Booking Requests
			</TextComponent>
			<View className="mb-6">
				{RECENT_REQUESTS.map((request) => (
					<BookingCard key={request.id} booking={request} />
				))}
			</View>
		</ScrollView>
	);
});

IndustryProDashboard.displayName = 'IndustryProDashboard';

export default IndustryProDashboard;
