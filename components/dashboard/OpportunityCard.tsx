import React, { memo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface OpportunityCardProps {
	image: string; // URL or local require
	title: string;
	daysLeft: number;
	onPress?: () => void;
}

const OpportunityCard = memo(
	({ image, title, daysLeft, onPress }: OpportunityCardProps) => {
		return (
			<View className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm border border-gray-100">
				<View className="h-40 w-full bg-gray-200">
					<Image
						source={{ uri: image }}
						className="w-full h-full"
						resizeMode="cover"
					/>
				</View>
				<View className="p-4">
					<Text className="text-lg font-bold text-black mb-1">{title}</Text>
					<Text className="text-gray-500 text-sm mb-3">
						{daysLeft} days left
					</Text>
					<TouchableOpacity
						className="bg-indigo-600 py-3 rounded-lg items-center"
						onPress={onPress}>
						<Text className="text-white font-semibold">View & Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	},
);

OpportunityCard.displayName = 'OpportunityCard';

export default OpportunityCard;
