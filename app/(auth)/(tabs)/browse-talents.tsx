import TextComponent from '@/components/TextComponent';
import SearchBar from '@/components/search/SearchBar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BrowseTalents() {
	const [searchQuery, setSearchQuery] = useState('');

	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View style={{ flex: 1, backgroundColor: '#AFEEEE' }}>
				{/* Header */}
				<View className="bg-white px-5 py-4 pb-4">
					<View className="flex-row items-center justify-between">
						<TextComponent className="text-2xl font-bold">
							Browse Talents
						</TextComponent>
					</View>
				</View>

				{/* Search & Content */}
				<View className="flex-1 px-4">
					<View className="mt-4 mb-4">
						<SearchBar
							value={searchQuery}
							onChangeText={setSearchQuery}
							onFilterPress={() => {}}
						/>
					</View>
					
					<View className="flex-1 items-center justify-center">
						<TextComponent className="text-gray-500 text-center">
							No talents found.
						</TextComponent>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
}
