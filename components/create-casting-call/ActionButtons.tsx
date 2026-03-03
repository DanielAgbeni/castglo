import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface ActionButtonsProps {
	onCreate: () => void;
	onSaveDraft: () => void;
}

const ActionButtons = memo(({ onCreate, onSaveDraft }: ActionButtonsProps) => {
	return (
		<View className="flex-row mt-2 mb-8 gap-x-4">
			<TouchableOpacity 
				className="flex-1 bg-indigo-600 py-3.5 rounded-xl items-center"
				onPress={onCreate}
			>
				<TextComponent className="text-white font-semibold text-base">Create</TextComponent>
			</TouchableOpacity>
			
			<TouchableOpacity 
				className="flex-1 bg-white border border-gray-300 py-3.5 rounded-xl items-center"
				onPress={onSaveDraft}
			>
				<TextComponent className="text-gray-900 font-semibold text-base">Save as Draft</TextComponent>
			</TouchableOpacity>
		</View>
	);
});

ActionButtons.displayName = 'ActionButtons';
export default ActionButtons;
