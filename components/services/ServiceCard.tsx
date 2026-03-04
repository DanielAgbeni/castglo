import TextComponent from '@/components/TextComponent';
import { SquarePen, Trash2 } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

export interface ServiceItem {
	id: string;
	title: string;
	isActive: boolean;
	bookingsCount: number;
	description: string;
	price: number;
	duration: string;
}

interface ServiceCardProps {
	item: ServiceItem;
	onEdit: () => void;
	onDelete: () => void;
	onViewDetails: () => void;
}

const ServiceCard = memo(({ item, onEdit, onDelete, onViewDetails }: ServiceCardProps) => {
	return (
		<View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-teal-100">
			<View className="flex-row justify-between items-start mb-2">
				<TextComponent className="text-lg font-semibold flex-1 mr-2 text-black">
					{item.title}
				</TextComponent>
				<View className="flex-row gap-x-3 items-center">
					<TouchableOpacity onPress={onEdit}>
						<SquarePen size={22} color="#000" />
					</TouchableOpacity>
					<TouchableOpacity onPress={onDelete}>
						<Trash2 size={22} color="#ff3b30" />
					</TouchableOpacity>
				</View>
			</View>

			<View className="flex-row items-center mb-4">
				{item.isActive && (
					<View className="bg-[#00d26a] px-2 py-0.5 rounded mr-3">
						<TextComponent className="text-white text-[10px] font-bold uppercase tracking-wider">
							Active
						</TextComponent>
					</View>
				)}
				<TextComponent className="text-gray-500 text-sm">
					{item.bookingsCount} bookings
				</TextComponent>
			</View>

			<TextComponent className="text-gray-600 text-sm mb-4 leading-5">
				{item.description}
			</TextComponent>

			<View className="h-[1px] bg-gray-200 mb-4" />

			<View className="flex-row justify-between items-center">
				<View>
					<TextComponent className="text-2xl font-bold text-black">
						${item.price}
					</TextComponent>
					<TextComponent className="text-gray-500 text-sm mt-1">
						{item.duration}
					</TextComponent>
				</View>
				<TouchableOpacity
					onPress={onViewDetails}
					className="bg-[#5a4ddb] px-4 py-2.5 rounded-lg">
					<TextComponent className="text-white font-medium">
						View Details
					</TextComponent>
				</TouchableOpacity>
			</View>
		</View>
	);
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
