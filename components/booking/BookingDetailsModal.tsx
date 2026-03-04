import ModalLayout from '@/components/ModalLayout';
import TextComponent from '@/components/TextComponent';
import { X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { BookingData, BookingStatus } from './BookingItem';

interface BookingDetailsModalProps {
	visible: boolean;
	onClose: () => void;
	booking: BookingData | null;
	onMessage: (booking: BookingData) => void;
}

const getStatusColor = (status: BookingStatus) => {
	switch (status) {
		case 'confirmed':
			return { bg: '#00d26a', text: '#fff' };
		case 'pending':
			return { bg: '#f59e0b', text: '#fff' };
		case 'completed':
			return { bg: '#3b82f6', text: '#fff' };
		default:
			return { bg: '#e5e7eb', text: '#374151' };
	}
};

export default function BookingDetailsModal({
	visible,
	onClose,
	booking,
	onMessage,
}: BookingDetailsModalProps) {
	if (!booking) return null;

	const statusColor = getStatusColor(booking.status);

	return (
		<ModalLayout
			visible={visible}
			transparent
			animationType="fade"
			onClose={onClose}>
			<View className="flex-1 justify-center items-center bg-black/40 px-4">
				<View className="bg-[#AFEEEE] w-full max-w-sm rounded-[24px] p-6 shadow-xl border border-teal-200">
					{/* Header */}
					<View className="flex-row justify-between items-start mb-1 h-8">
						<TextComponent className="text-xl font-bold text-black">
							Booking Details
						</TextComponent>
						<TouchableOpacity onPress={onClose} className="p-1 -mr-2 -mt-2">
							<X size={24} color="#4b5563" />
						</TouchableOpacity>
					</View>

					<TextComponent className="text-gray-800 text-sm mb-6 leading-5">
						Complete information about this booking
					</TextComponent>

					{/* Profile Info */}
					<View className="flex-row items-center mb-6">
						<View className="w-14 h-14 rounded-full bg-[#f1e6e0] items-center justify-center mr-4">
							<TextComponent className="text-2xl font-medium text-black">
								{booking.initials}
							</TextComponent>
						</View>
						<View>
							<TextComponent className="text-lg font-bold text-black mb-1">
								{booking.userName}
							</TextComponent>
							<View
								className="self-start px-2 py-0.5 rounded"
								style={{ backgroundColor: statusColor.bg }}>
								<TextComponent className="text-[10px] font-bold text-white uppercase tracking-wider">
									{booking.status}
								</TextComponent>
							</View>
						</View>
					</View>

					{/* Service */}
					<View className="mb-4">
						<TextComponent className="text-black font-bold mb-1">
							Service
						</TextComponent>
						<TextComponent className="text-gray-800 text-sm">
							{booking.serviceType}
						</TextComponent>
					</View>

					{/* Date & Time Row */}
					<View className="flex-row mb-4">
						<View className="flex-1">
							<TextComponent className="text-black font-bold mb-1">
								Date
							</TextComponent>
							<TextComponent className="text-gray-800 text-sm">
								{booking.date}
							</TextComponent>
						</View>
						<View className="flex-1">
							<TextComponent className="text-black font-bold mb-1">
								Time
							</TextComponent>
							<TextComponent className="text-gray-800 text-sm">
								{booking.time}
							</TextComponent>
						</View>
					</View>

					{/* Location */}
					<View className="mb-4">
						<TextComponent className="text-black font-bold mb-1">
							Location
						</TextComponent>
						<TextComponent className="text-gray-800 text-sm">
							{booking.location}
						</TextComponent>
					</View>

					{/* Amount */}
					<View className="mb-4">
						<TextComponent className="text-black font-bold mb-1">
							Amount
						</TextComponent>
						<TextComponent className="text-black font-bold text-base">
							${booking.price}
						</TextComponent>
					</View>

					{/* Notes (Optional) */}
					{booking.notes && (
						<View className="mb-6">
							<TextComponent className="text-black font-bold mb-1">
								Notes
							</TextComponent>
							<TextComponent className="text-gray-800 text-sm leading-5">
								{booking.notes}
							</TextComponent>
						</View>
					)}

					{/* Action Button */}
					<TouchableOpacity
						onPress={() => onMessage(booking)}
						className="bg-[#5a4ddb] w-full py-3 rounded-lg items-center justify-center mt-2">
						<TextComponent className="text-white font-medium">
							Send Message
						</TextComponent>
					</TouchableOpacity>
				</View>
			</View>
		</ModalLayout>
	);
}
