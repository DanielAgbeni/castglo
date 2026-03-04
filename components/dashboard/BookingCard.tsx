import TextComponent from '@/components/TextComponent';
import { Calendar, Clock, MoreVertical } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

export interface Booking {
	id: string;
	userName: string;
	serviceType: string;
	date: string;
	time?: string;
	status: 'confirmed' | 'pending';
	price?: string;
	isRequest?: boolean; // If true, it's a request, so no time/status/price needed
}

interface BookingCardProps {
	booking: Booking;
	onOptionsPress?: () => void;
}

const getInitials = (name: string) => {
	const names = name.split(' ');
	if (names.length >= 2) {
		return `${names[0][0]}${names[1][0]}`.toUpperCase();
	}
	return name.substring(0, 2).toUpperCase();
};

const BookingCard = memo(({ booking, onOptionsPress }: BookingCardProps) => {
	const initials = getInitials(booking.userName);

	return (
		<View className="bg-white rounded-2xl p-4 mb-3 flex-row shadow-sm">
			{/* Avatar Circle */}
			<View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3 mt-1">
				<TextComponent className="text-gray-700 font-bold text-lg">
					{initials}
				</TextComponent>
			</View>

			{/* Main Content */}
			<View className="flex-1">
				<View className="flex-row justify-between items-start">
					<TextComponent className="text-base font-bold text-black mb-1">
						{booking.userName}
					</TextComponent>
					<TouchableOpacity onPress={onOptionsPress} className="p-1 -mt-1 -mr-2">
						<MoreVertical size={20} color="#374151" />
					</TouchableOpacity>
				</View>
				
				<TextComponent className="text-gray-600 text-sm mb-2">
					{booking.serviceType}
				</TextComponent>

				{!booking.isRequest ? (
					<View className="flex-row items-center justify-between mt-1">
						<View>
							<View className="flex-row items-center mb-1.5 space-x-4 gap-x-4">
								<View className="flex-row items-center gap-x-1.5">
									<Calendar size={14} color="#374151" />
									<TextComponent className="text-gray-600 text-xs">
										{booking.date}
									</TextComponent>
								</View>
								<View className="flex-row items-center gap-x-1.5">
									<Clock size={14} color="#374151" />
									<TextComponent className="text-gray-600 text-xs">
										{booking.time}
									</TextComponent>
								</View>
							</View>
							<View
								className={`self-start px-2 py-0.5 rounded-md ${
									booking.status === 'confirmed'
										? 'bg-[#00D26A]'
										: 'bg-[#FBBF24]'
								}`}>
								<TextComponent className="text-white text-[10px] font-bold">
									{booking.status === 'confirmed' ? 'Confirmed' : 'pending'}
								</TextComponent>
							</View>
						</View>
						<TextComponent className="text-lg font-bold text-black mt-2">
							{booking.price}
						</TextComponent>
					</View>
				) : (
					<View className="mt-1">
						<TextComponent className="text-gray-500 text-sm">
							Requested {booking.date}
						</TextComponent>
					</View>
				)}
			</View>
		</View>
	);
});

BookingCard.displayName = 'BookingCard';

export default BookingCard;
