import TextComponent from '@/components/TextComponent';
import { Mail, MapPin, Star } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

export interface TalentItem {
	id: string;
	name: string;
	initials: string;
	role: string;
	rating: number;
	reviewsCount: number;
	location: string;
	experience: string;
	skills: string[];
	description: string;
}

interface TalentCardProps {
	talent: TalentItem;
	onViewProfile: (talent: TalentItem) => void;
	onMessage: (talent: TalentItem) => void;
}

const TalentCard = memo(({ talent, onViewProfile, onMessage }: TalentCardProps) => {
	return (
		<View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-teal-100">
			{/* Header: Avatar, Name, Role, Rating */}
			<View className="flex-row items-start mb-3">
				<View className="w-10 h-10 rounded-full bg-[#f1e6e0] items-center justify-center mr-3">
					<TextComponent className="text-lg font-medium text-black">
						{talent.initials}
					</TextComponent>
				</View>
				<View className="flex-1">
					<View className="flex-row justify-between items-start">
						<TextComponent className="text-lg font-semibold text-black leading-tight">
							{talent.name}
						</TextComponent>
						<View className="flex-row items-center mt-0.5">
							<Star size={16} color="#facc15" fill="#facc15" />
							<TextComponent className="text-black font-semibold ml-1 text-sm">
								{talent.rating}
							</TextComponent>
							<TextComponent className="text-gray-500 text-sm ml-0.5">
								({talent.reviewsCount})
							</TextComponent>
						</View>
					</View>
					<TextComponent className="text-gray-600 text-sm">{talent.role}</TextComponent>
				</View>
			</View>

			{/* Location & Experience */}
			<View className="flex-row items-center mb-3">
				<MapPin size={14} color="#4b5563" />
				<TextComponent className="text-gray-600 text-sm ml-1">
					{talent.location} • {talent.experience} years experience
				</TextComponent>
			</View>

			{/* Skills Tags */}
			<View className="flex-row flex-wrap gap-2 mb-3">
				{talent.skills.map((skill, index) => (
					<View key={index} className="bg-[#9baab5] px-2 py-0.5 rounded">
						<TextComponent className="text-[10px] font-bold text-gray-900">
							{skill}
						</TextComponent>
					</View>
				))}
			</View>

			{/* Description */}
			<TextComponent className="text-gray-600 text-sm mb-4 leading-5 line-clamp-3">
				{talent.description}
			</TextComponent>

			{/* Actions */}
			<View className="flex-row items-center gap-x-2">
				<TouchableOpacity
					onPress={() => onViewProfile(talent)}
					className="flex-1 bg-[#5a4ddb] py-2.5 rounded-lg items-center justify-center">
					<TextComponent className="text-white font-medium">View Profile</TextComponent>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => onMessage(talent)}
					className="w-[42px] h-[42px] border border-gray-300 rounded-lg items-center justify-center">
					<Mail size={20} color="#4b5563" />
				</TouchableOpacity>
			</View>
		</View>
	);
});

TalentCard.displayName = 'TalentCard';

export default TalentCard;
