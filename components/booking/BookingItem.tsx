import TextComponent from '@/components/TextComponent';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

export type BookingStatus = 'confirmed' | 'pending' | 'completed';

export interface BookingData {
	id: string;
	userName: string;
	initials: string;
	serviceType: string;
	date: string;
	time: string;
	location: string;
	price: number;
	status: BookingStatus;
	notes?: string;
}

interface BookingItemProps {
	booking: BookingData;
	onViewDetails: (booking: BookingData) => void;
	onAccept?: (id: string) => void;
	onDecline?: (id: string) => void;
}

const getStatusColor = (status: BookingStatus) => {
	switch (status) {
		case 'confirmed':
			return { bg: '#00d26a', text: '#fff' };
		case 'pending':
			return { bg: '#f59e0b', text: '#fff' }; // Amber
		case 'completed':
			return { bg: '#3b82f6', text: '#fff' }; // Blue
		default:
			return { bg: '#e5e7eb', text: '#374151' };
	}
};

const BookingItem = memo(({ booking, onViewDetails, onAccept, onDecline }: BookingItemProps) => {
	const statusColor = getStatusColor(booking.status);

	return (
		<View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-teal-100">
			{/* Header: Avatar, Name, Status */}
			<View className="flex-row items-start mb-3">
				<View className="w-12 h-12 rounded-full bg-[#e5e5e5] items-center justify-center mr-3">
					<TextComponent className="text-xl font-medium text-black">
						{booking.initials}
					</TextComponent>
				</View>
				<View className="flex-1">
					<View className="flex-row justify-between items-center mb-1">
						<TextComponent className="text-lg font-bold text-black flex-1 mr-2">
							{booking.userName}
						</TextComponent>
						<View
							className="px-2 py-0.5 rounded"
							style={{ backgroundColor: statusColor.bg }}>
							<TextComponent className="text-[10px] font-bold text-white uppercase tracking-wider">
								{booking.status}
							</TextComponent>
						</View>
					</View>
					<TextComponent className="text-gray-600 text-sm">
						{booking.serviceType}
					</TextComponent>
				</View>
			</View>

			{/* Date, Time, Location */}
			<View className="mb-4">
				<View className="flex-row items-center gap-x-4 mb-1.5">
					<View className="flex-row items-center gap-x-1.5">
						<Calendar size={16} color="#4b5563" />
						<TextComponent className="text-gray-700 text-sm">
							{booking.date}
						</TextComponent>
					</View>
					<View className="flex-row items-center gap-x-1.5">
						<Clock size={16} color="#4b5563" />
						<TextComponent className="text-gray-700 text-sm">
							{booking.time}
						</TextComponent>
					</View>
				</View>
				<View className="flex-row items-center gap-x-1.5">
					<MapPin size={16} color="#4b5563" />
					<TextComponent className="text-gray-700 text-sm">
						{booking.location}
					</TextComponent>
				</View>
			</View>

			{/* Price and Actions */}
			<View className="flex-row justify-between items-center">
				<TextComponent className="text-xl font-bold text-black">
					${booking.price}
				</TextComponent>
				
				{booking.status === 'pending' ? (
					<View className="flex-row gap-x-2">
						<TouchableOpacity
							onPress={() => onViewDetails(booking)}
							className="bg-[#5a4ddb] px-4 py-2 rounded-lg justify-center">
							<TextComponent className="text-white font-medium text-sm">
								View Details
							</TextComponent>
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						onPress={() => onViewDetails(booking)}
						className="bg-[#5a4ddb] px-4 py-2 rounded-lg">
						<TextComponent className="text-white font-medium text-sm">
							View Details
						</TextComponent>
					</TouchableOpacity>
				)}
			</View>

			{/* Accept/Decline Options for Pending */}
			{booking.status === 'pending' && onAccept && onDecline && (
				<View className="flex-row gap-x-2 mt-3 pt-3 border-t border-gray-100 justify-end">
					<TouchableOpacity
						onPress={() => onAccept(booking.id)}
						className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex-1 items-center">
						<TextComponent className="text-gray-700 font-medium">
							Accept
						</TextComponent>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onDecline(booking.id)}
						className="bg-[#ef4444] px-4 py-2 rounded-lg flex-1 items-center">
						<TextComponent className="text-white font-medium">
							Decline
						</TextComponent>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
});

BookingItem.displayName = 'BookingItem';

export default BookingItem;
