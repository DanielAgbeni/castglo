import TalentCard, { TalentItem } from '@/components/browse-talents/TalentCard';
import TalentProfileModal from '@/components/browse-talents/TalentProfileModal';
import TextComponent from '@/components/TextComponent';
import { FlashList } from '@shopify/flash-list';
import { ChevronDown, Newspaper } from 'lucide-react-native';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_TALENTS: TalentItem[] = [
	{
		id: '1',
		name: 'Sarah Johnson',
		initials: 'S',
		role: 'Actor',
		rating: 4.9,
		reviewsCount: 24,
		location: 'Los Angeles, CA',
		experience: '8',
		skills: ['Drama', 'Comedy', 'Voice Acting'],
		description:
			'Versatile actor with extensive experience in film, television, and theater. Passionate about bringing authentic characters to life.',
	},
	{
		id: '2',
		name: 'Michael Chen',
		initials: 'M',
		role: 'Actor',
		rating: 4.8,
		reviewsCount: 18,
		location: 'New York, NY',
		experience: '5',
		skills: ['Fashion', 'Commercial', 'Editorial'],
		description:
			'Professional model specializing in fashion and commercial work. Available for print, runway, and digital campaigns.',
	},
	{
		id: '3',
		name: 'Emma Rodriguez',
		initials: 'E',
		role: 'Dancer',
		rating: 5,
		reviewsCount: 24,
		location: 'Miami, FL',
		experience: '10',
		skills: ['Contemporary', 'Ballet', 'Hip Hop'],
		description:
			'Award-winning dancer with classical training and contemporary expertise. Choreographer and performer.',
	},
	{
		id: '4',
		name: 'David Kim',
		initials: 'D',
		role: 'Voice Actor',
		rating: 4.8,
		reviewsCount: 22,
		location: 'Chicago, IL',
		experience: '6',
		skills: ['Animation', 'Commercial', 'Audiobooks'],
		description:
			'Professional voice actor with a versatile range. Experienced in character voices, narration, and commercial work.',
	},
];

export default function BrowseTalents() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTalent, setSelectedTalent] = useState<TalentItem | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleViewProfile = (talent: TalentItem) => {
		setSelectedTalent(talent);
		setIsModalVisible(true);
	};

	const handleMessage = (talent: TalentItem) => {
		console.log('Message talent:', talent.name);
		setIsModalVisible(false); // Close modal if it's open
	};

	const renderHeader = () => (
		<View className="bg-white rounded-xl p-3 border border-teal-200 mb-4 shadow-sm">
			<TextInput
				value={searchQuery}
				onChangeText={setSearchQuery}
				placeholder="Search talents by name, skill, or location"
				placeholderTextColor="#64748b"
				className="bg-[#cbf1ef] border border-[#a1dce0] rounded-lg px-3 py-2.5 text-black mb-2.5"
			/>
			<TouchableOpacity className="flex-row items-center justify-between bg-[#cbf1ef] border border-[#a1dce0] rounded-lg px-3 py-2.5 mb-2.5">
				<TextComponent className="text-gray-700 font-semibold">Role</TextComponent>
				<ChevronDown size={20} color="#000" />
			</TouchableOpacity>
			<TouchableOpacity className="flex-row items-center justify-between bg-[#cbf1ef] border border-[#a1dce0] rounded-lg px-3 py-2.5">
				<TextComponent className="text-gray-700 font-semibold">Location</TextComponent>
				<ChevronDown size={20} color="#000" />
			</TouchableOpacity>
		</View>
	);

	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View style={{ flex: 1, backgroundColor: '#AFEEEE' }}>
				{/* App Header */}
				<View className="bg-white px-5 py-4 pb-4">
					<View className="flex-row items-center justify-between">
						<TextComponent className="text-2xl font-bold text-black">
							Browse Talents
						</TextComponent>
						<Newspaper size={24} color="#000" />
					</View>
				</View>

				{/* Content */}
				<View style={{ flex: 1 }}>
					<FlashList
						data={MOCK_TALENTS}
						renderItem={({ item }) => (
							<TalentCard
								talent={item}
								onViewProfile={handleViewProfile}
								onMessage={handleMessage}
							/>
						)}
						ListHeaderComponent={renderHeader}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>

			<TalentProfileModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				talent={selectedTalent}
				onMessage={handleMessage}
			/>
		</SafeAreaView>
	);
}
