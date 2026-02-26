import TextComponent from '@/components/TextComponent';
import { ChevronDown, Info } from 'lucide-react-native';
import React, { useState } from 'react';
import {
	ScrollView,
	Switch,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VirtualAssistant() {
	const [isPublic, setIsPublic] = useState(false);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top']}>
			{/* Header */}
			<View className="flex-row items-center justify-between px-4 py-4 bg-white border-b border-gray-100">
				<View className="flex-1" />
				<TextComponent className="font-bold text-xl text-black text-center">
					Create Virtual Account
				</TextComponent>
				<View className="flex-1 items-end">
					<TouchableOpacity>
						<Info size={24} color="#000" />
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView
				className="flex-1 bg-[#AFEEEE]"
				contentContainerStyle={{ padding: 16 }}>
				<TextComponent className="text-xl font-bold text-black mb-1">
					Audition Details
				</TextComponent>
				<TextComponent className="text-gray-700 mb-6 text-base">
					Provide information about your virtual audition session
				</TextComponent>

				<TextComponent className="font-semibold text-black mb-2 text-base">
					Audition Title *
				</TextComponent>
				<TextInput
					className="bg-white rounded-xl px-4 py-3 mb-4 text-black border border-gray-200 text-base"
					placeholder="e.g., Monologue Performance - Shakespeare"
					placeholderTextColor="#6b7280"
				/>

				<TextComponent className="font-semibold text-black mb-2 text-base">
					Description
				</TextComponent>
				<TextInput
					className="bg-white rounded-xl px-4 py-3 mb-4 text-black border border-gray-200 text-base"
					placeholder="Describe what you'll be performing and any special requirements..."
					placeholderTextColor="#6b7280"
					multiline
					numberOfLines={4}
					style={{ height: 100, textAlignVertical: 'top' }}
				/>

				<View className="flex-row gap-4 mb-4">
					<View className="flex-1">
						<TextComponent className="font-semibold text-black mb-2 text-base">
							Date
						</TextComponent>
						<View className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex-row justify-between items-center">
							<TextComponent className="text-gray-500 text-base">
								DD/MM/YY
							</TextComponent>
							<ChevronDown size={20} color="#9ca3af" />
						</View>
					</View>
					<View className="flex-1">
						<TextComponent className="font-semibold text-black mb-2 text-base">
							Time
						</TextComponent>
						<View className="bg-white rounded-xl px-4 py-3 border border-gray-200 flex-row justify-between items-center">
							<TextComponent className="text-gray-500 text-base">
								--:--
							</TextComponent>
							<ChevronDown size={20} color="#9ca3af" />
						</View>
					</View>
				</View>

				<TextComponent className="font-semibold text-black mb-2 text-base">
					Duration
				</TextComponent>
				<View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200 flex-row justify-between w-[48%] items-center">
					<TextComponent className="text-gray-800 text-base">
						30 minutes
					</TextComponent>
					<ChevronDown size={20} color="#9ca3af" />
				</View>

				{/* Public Audition Toggle */}
				<View className="bg-white rounded-xl p-4 mb-4 flex-row justify-between items-center border border-gray-200">
					<View className="flex-1 pr-4">
						<TextComponent className="font-semibold text-black text-base">
							Public Audition
						</TextComponent>
						<TextComponent className="text-gray-600 mt-1">
							Allow anyone with the link to view this audition
						</TextComponent>
					</View>
					<Switch
						value={isPublic}
						onValueChange={setIsPublic}
						trackColor={{ false: '#d1d5db', true: '#000000' }}
						thumbColor={'#ffffff'}
					/>
				</View>

				<TextComponent className="font-semibold text-black mb-2 text-base">
					Participant Limit
				</TextComponent>
				<View className="bg-white rounded-xl px-4 py-3 mb-4 border border-gray-200 flex-row justify-between items-center w-[48%]">
					<TextComponent className="text-gray-800 text-base">
						5 people
					</TextComponent>
					<ChevronDown size={20} color="#9ca3af" />
				</View>

				<TextComponent className="font-semibold text-black mb-2 text-base">
					Upload Audition Script/Materials
				</TextComponent>
				<TouchableOpacity className="bg-white rounded-xl mb-2 flex-row border border-gray-200 overflow-hidden items-center">
					<View className="px-4 py-3 border-r border-gray-200 bg-white">
						<TextComponent className="font-bold text-black text-base">
							Choose File
						</TextComponent>
					</View>
					<View className="flex-1 px-4 py-3 justify-center">
						<TextComponent className="text-gray-700 text-base">
							No file chosen
						</TextComponent>
					</View>
				</TouchableOpacity>
				<TextComponent className="text-gray-600 mb-6">
					Upload scripts, sides, or other materials for participants (PDF, DOC, DOCX, TXT)
				</TextComponent>

				{/* Buttons */}
				<TouchableOpacity className="bg-[#5B4AE0] rounded-xl py-4 mb-3 items-center shadow-sm">
					<TextComponent className="text-white font-bold text-lg">
						Create Virtual Audition
					</TextComponent>
				</TouchableOpacity>

				<TouchableOpacity className="bg-white rounded-xl py-4 mb-10 items-center shadow-sm">
					<TextComponent className="text-black font-bold text-lg">
						Cancel
					</TextComponent>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
}
