import { Search, X } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import {
	FlatList,
	Modal,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import TextComponent from '../TextComponent';

interface Option {
	label: string;
	value: string;
}

interface OptionSelectModalProps {
	isVisible: boolean;
	onClose: () => void;
	onSelect: (value: string) => void;
	options: Option[];
	title: string;
	selectedValue?: string;
}

const OptionSelectModal = memo(({
	isVisible,
	onClose,
	onSelect,
	options,
	title,
	selectedValue,
}: OptionSelectModalProps) => {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredOptions = options.filter((option) =>
		option.label.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Modal
			visible={isVisible}
			animationType="slide"
			presentationStyle="pageSheet"
			onRequestClose={onClose}
		>
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1">
					{/* Header */}
					<View className="px-6 py-4 border-b border-gray-100 flex-row items-center justify-between">
						<TextComponent className="text-xl font-bold text-gray-900">
							{title}
						</TextComponent>
						<TouchableOpacity
							onPress={onClose}
							className="p-2 bg-gray-50 rounded-full active:bg-gray-100"
						>
							<X size={20} color="#111827" />
						</TouchableOpacity>
					</View>

					{/* Search Bar */}
					<View className="px-6 py-4">
						<View className="flex-row items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
							<Search size={18} color="#9CA3AF" />
							<TextInput
								className="flex-1 ml-3 text-base text-gray-900 h-10"
								placeholder="Search options..."
								placeholderTextColor="#9CA3AF"
								value={searchQuery}
								onChangeText={setSearchQuery}
							/>
						</View>
					</View>

					{/* Options List */}
					<FlatList
						data={filteredOptions}
						keyExtractor={(item) => item.value}
						contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									onSelect(item.value);
									onClose();
								}}
								className={`py-4 border-b border-gray-50 flex-row items-center justify-between ${
									selectedValue === item.value ? 'bg-indigo-50/50 -mx-4 px-4 rounded-xl' : ''
								}`}
							>
								<TextComponent
									className={`text-base ${
										selectedValue === item.value
											? 'text-indigo-600 font-bold'
											: 'text-gray-800'
									}`}
								>
									{item.label}
								</TextComponent>
								{selectedValue === item.value && (
									<View className="w-2 h-2 rounded-full bg-indigo-600" />
								)}
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<View className="py-20 items-center">
								<TextComponent className="text-gray-400 text-base">
									No options found
								</TextComponent>
							</View>
						}
					/>
				</View>
			</SafeAreaView>
		</Modal>
	);
});

OptionSelectModal.displayName = 'OptionSelectModal';

export default OptionSelectModal;
