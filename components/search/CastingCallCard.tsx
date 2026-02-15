import TextComponent from '@/components/TextComponent';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

export interface CastingCall {
	id: string;
	title: string;
	location: string;
	timeLeft: string;
	category: string;
	imageUrl: string;
}

interface CastingCallCardProps {
	item: CastingCall;
	onPress?: () => void;
}

const CastingCallCard: React.FC<CastingCallCardProps> = ({ item, onPress }) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			className="mb-4 overflow-hidden rounded-xl bg-white shadow-sm elevation-1" // elevation for android shadow
			style={{
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 4,
			}}>
			{/* Image Section */}
			<View className="relative h-48 w-full">
				<Image
					source={{ uri: item.imageUrl }}
					className="h-full w-full"
					resizeMode="cover"
				/>
				{/* Gradient Overlay or Badge could go here if needed */}
			</View>

			{/* Content Section */}
			<View className="p-4">
				<View className="flex-row items-center justify-between">
					<View className="flex-1 pr-4">
						<TextComponent
							size="large"
							className="mb-1 font-bold">
							{item.title}
						</TextComponent>
						<TextComponent
							size="small"
							className="mb-3 text-gray-500">
							{item.location} • {item.timeLeft}
						</TextComponent>
					</View>
				</View>

				<View className="flex-row items-center justify-between">
					{/* Category Badge */}
					<View className="self-start rounded-lg border border-gray-300 bg-gray-100 px-3 py-1">
						<TextComponent
							size="small"
							className="font-medium text-black">
							{item.category}
						</TextComponent>
					</View>

					{/* Arrow Icon */}
					<ChevronRight
						size={20}
						color="#000"
					/>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CastingCallCard;
