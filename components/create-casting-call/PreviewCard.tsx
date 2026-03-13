import { Calendar, MapPin } from 'lucide-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

interface PreviewCardProps {
	title: string;
	location: string;
	deadline: string;
	description: string;
}

const PreviewCard = memo(({ title, location, deadline, description }: PreviewCardProps) => {
	const formatDate = (dateString: string) => {
		if (!dateString) return '';
		try {
			const d = new Date(dateString);
			if (isNaN(d.getTime())) return dateString;
			return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
		} catch {
			return dateString;
		}
	};

	return (
		<View className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-6">
			<TextComponent className="text-xl font-bold text-gray-900 mb-3">
				{title || 'Your Casting Call Title'}
			</TextComponent>
			
			<View className="flex-row items-center mb-4">
				<View className="flex-row items-center mr-6">
					<MapPin size={16} color="#4B5563" />
					<TextComponent className="text-gray-600 font-normal text-sm ml-2">
						{location || 'Location'}
					</TextComponent>
				</View>
				<View className="flex-row items-center">
					<Calendar size={16} color="#4B5563" />
					<TextComponent className="text-gray-600 font-normal text-sm ml-2">
						{deadline ? formatDate(deadline) : 'Deadline'}
					</TextComponent>
				</View>
			</View>
			
			<TextComponent className="text-gray-800 font-normal text-base leading-6" numberOfLines={3}>
				{description || 'Your casting call description will appear here...'}
			</TextComponent>
		</View>
	);
});

PreviewCard.displayName = 'PreviewCard';
export default PreviewCard;
