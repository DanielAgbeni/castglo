import { Search, SlidersHorizontal, X } from 'lucide-react-native';
import React, { memo } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	onFilterPress: () => void;
	placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChangeText,
	onFilterPress,
	placeholder = 'Search Castings...',
}) => {
	return (
		<View className="flex-row items-center gap-3">
			<View className="flex-1 flex-row items-center rounded-lg border border-gray-200 bg-white px-3 py-2">
				{/* Search Icon */}
				<Search
					size={20}
					color="#9CA3AF"
					className="mr-2"
				/>

				{/* Text Input */}
				<TextInput
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					placeholderTextColor="#9CA3AF"
					className="flex-1 text-base text-gray-500"
					autoCapitalize="none"
				/>

				{/* Clear Button (only if there is text) */}
				{value.length > 0 && (
					<TouchableOpacity onPress={() => onChangeText('')}>
						<X
							size={18}
							color="#9CA3AF"
						/>
					</TouchableOpacity>
				)}
			</View>

			{/* Filter Button */}
			<TouchableOpacity
				onPress={onFilterPress}
				className="rounded-lg border border-gray-300 bg-white p-3">
				<SlidersHorizontal
					size={24}
					color="#1F2937"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default memo(SearchBar);
