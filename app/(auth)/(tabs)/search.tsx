import TextComponent from '@/components/TextComponent';
import CastingCallCard, {
	CastingCall,
} from '@/components/search/CastingCallCard';
import FilterSection from '@/components/search/FilterSection';
import SearchBar from '@/components/search/SearchBar';
import { useRouter } from 'expo-router';
import { Newspaper } from 'lucide-react-native';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock Data
const MOCK_CASTING_CALLS: CastingCall[] = [
	{
		id: '1',
		title: 'Lead Role - Indie Drama',
		location: 'Los Angeles, CA',
		timeLeft: '2 days left',
		category: 'Drama',
		imageUrl:
			'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2670&auto=format&fit=crop',
	},
	{
		id: '2',
		title: 'Commercial - Fast Food Brand',
		location: 'New York, NY',
		timeLeft: '5 days left',
		category: 'Commercial',
		imageUrl:
			'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=2574&auto=format&fit=crop',
	},
	{
		id: '3',
		title: 'Music Video - Pop Artist',
		location: 'Los Angeles, CA',
		timeLeft: '3 days left',
		category: 'Music',
		imageUrl:
			'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2670&auto=format&fit=crop',
	},
	{
		id: '4',
		title: 'Reality TV Show - Casting',
		location: 'Miami, FL',
		timeLeft: '1 week left',
		category: 'Reality',
		imageUrl:
			'https://images.unsplash.com/photo-1603729377484-9a5c9d645e74?q=80&w=2670&auto=format&fit=crop',
	},
];

export default function Search() {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [isFilterVisible, setIsFilterVisible] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [location, setLocation] = useState('');

	const filteredCastings = MOCK_CASTING_CALLS.filter((item) => {
		const matchesSearch = item.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory
			? item.category === selectedCategory
			: true;
		const matchesLocation = location
			? item.location.toLowerCase().includes(location.toLowerCase())
			: true;

		return matchesSearch && matchesCategory && matchesLocation;
	});

	return (
		<SafeAreaView
			className="flex-1 bg-[#AFEEEE]"
			edges={['top']}>
			<View className="flex-1 px-4">
				{/* Header */}
				<View className="mb-4 flex-row items-center justify-between pt-2">
					<TextComponent
						size="large"
						className="text-2xl font-bold text-black">
						Browse Casting Calls
					</TextComponent>
					<TouchableOpacity>
						<Newspaper
							size={24}
							color="#374151"
						/>
					</TouchableOpacity>
				</View>

				{/* Search & Filter Section */}
				<View className="mb-4">
					<SearchBar
						value={searchQuery}
						onChangeText={setSearchQuery}
						onFilterPress={() => setIsFilterVisible(!isFilterVisible)}
					/>
					<FilterSection
						visible={isFilterVisible}
						selectedCategory={selectedCategory}
						onSelectCategory={setSelectedCategory}
						location={location}
						onChangeLocation={setLocation}
					/>
				</View>

				{/* Casting Calls List */}
				<FlatList
					data={filteredCastings}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<CastingCallCard
							item={item}
							onPress={() => router.push(`/casting-call/${item.id}`)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 20 }}
					ListEmptyComponent={() => (
						<View className="mt-10 items-center justify-center">
							<TextComponent className="text-gray-500">
								No casting calls found.
							</TextComponent>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}
