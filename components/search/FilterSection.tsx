import TextComponent from '@/components/TextComponent';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface FilterSectionProps {
	visible: boolean;
	selectedCategory: string;
	onSelectCategory: (category: string) => void;
	location: string;
	onChangeLocation: (location: string) => void;
}

const CATEGORIES = ['Drama', 'Commercial', 'Music', 'Reality'];

const FilterSection: React.FC<FilterSectionProps> = ({
	visible,
	selectedCategory,
	onSelectCategory,
	location,
	onChangeLocation,
}) => {
	if (!visible) return null;

	return (
		<View className="mt-4 gap-4">
			{/* Category Section */}
			<View>
				<TextComponent
					size="medium"
					className="mb-2 font-semibold">
					Category
				</TextComponent>
				<View className="flex-row flex-wrap gap-2">
					{CATEGORIES.map((category) => {
						const isSelected = selectedCategory === category;
						return (
							<TouchableOpacity
								key={category}
								onPress={() => onSelectCategory(isSelected ? '' : category)}
								className={`rounded-lg border px-4 py-2 ${
									isSelected
										? 'border-black bg-black'
										: 'border-gray-300 bg-gray-100' // Keeping it light gray as per design implies unselected state
								}`}>
								<TextComponent
									size="medium"
									className={`${isSelected ? 'text-white' : 'text-black'} font-semibold`}>
									{category}
								</TextComponent>
							</TouchableOpacity>
						);
					})}
				</View>
			</View>

			{/* Location Section */}
			<View>
				<TextComponent
					size="medium"
					className="mb-2 font-semibold">
					Location
				</TextComponent>
				<View className="rounded-lg border border-gray-300 bg-white px-3 py-3">
					<TextInput
						value={location}
						onChangeText={onChangeLocation}
						placeholder="City or State"
						placeholderTextColor="#9CA3AF"
						className="text-base text-black"
					/>
				</View>
			</View>
		</View>
	);
};

export default FilterSection;
