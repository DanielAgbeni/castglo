import ModalLayout from '@/components/ModalLayout';
import TextComponent from '@/components/TextComponent';
import { MapPin, Star, X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TalentItem } from './TalentCard';

interface TalentProfileModalProps {
	visible: boolean;
	onClose: () => void;
	talent: TalentItem | null;
	onMessage: (talent: TalentItem) => void;
}

export default function TalentProfileModal({
	visible,
	onClose,
	talent,
	onMessage,
}: TalentProfileModalProps) {
	if (!talent) return null;

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
							Talent Profile
						</TextComponent>
						<TouchableOpacity onPress={onClose} className="p-1 -mr-2 -mt-2">
							<X size={24} color="#4b5563" />
						</TouchableOpacity>
					</View>

					<TextComponent className="text-gray-800 text-sm mb-5 leading-5">
						View detailed information about{'\n'}this talent
					</TextComponent>

					{/* Profile Info */}
					<View className="flex-row items-center mb-5">
						<View className="w-14 h-14 rounded-full bg-[#f1e6e0] items-center justify-center mr-4">
							<TextComponent className="text-2xl font-medium text-black">
								{talent.initials}
							</TextComponent>
						</View>
						<View>
							<TextComponent className="text-lg font-bold text-black mb-0.5">
								{talent.name}
							</TextComponent>
							<TextComponent className="text-gray-700 text-sm mb-1">
								{talent.role}
							</TextComponent>
							
							<View className="flex-row items-center">
								<Star size={14} color="#facc15" fill="#facc15" />
								<TextComponent className="text-black text-xs font-semibold ml-1 mr-1">
									{talent.rating}
								</TextComponent>
								<TextComponent className="text-gray-600 text-xs mr-3">
									({talent.reviewsCount} reviews)
								</TextComponent>
								<MapPin size={12} color="#4b5563" />
								<TextComponent className="text-gray-600 text-xs ml-1">
									{talent.location}
								</TextComponent>
							</View>
						</View>
					</View>

					{/* About Section */}
					<View className="mb-4">
						<TextComponent className="text-black font-bold mb-1">
							About
						</TextComponent>
						<TextComponent className="text-gray-800 text-sm leading-5">
							{talent.description}
						</TextComponent>
					</View>

					{/* Experience Section */}
					<View className="mb-4">
						<TextComponent className="text-black font-bold mb-1">
							Experience
						</TextComponent>
						<TextComponent className="text-gray-800 text-sm">
							{talent.experience} years of professional experience
						</TextComponent>
					</View>

					{/* Skills Section */}
					<View className="mb-6">
						<TextComponent className="text-black font-bold mb-2">
							Skills
						</TextComponent>
						<View className="flex-row flex-wrap gap-2">
							{talent.skills.map((skill, index) => (
								<View key={index} className="bg-[#9baab5] px-2 py-0.5 rounded">
									<TextComponent className="text-[10px] font-bold text-gray-900">
										{skill}
									</TextComponent>
								</View>
							))}
						</View>
					</View>

					{/* Action Button */}
					<TouchableOpacity
						onPress={() => onMessage(talent)}
						className="bg-[#5a4ddb] w-full py-3 rounded-lg items-center justify-center">
						<TextComponent className="text-white font-medium">
							Send Message
						</TextComponent>
					</TouchableOpacity>
				</View>
			</View>
		</ModalLayout>
	);
}
