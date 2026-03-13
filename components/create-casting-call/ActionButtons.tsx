import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface ActionButtonsProps {
	onCreate: () => void;
	onSaveDraft: () => void;
	isPending?: boolean;
}

const ActionButtons = memo(({ onCreate, onSaveDraft, isPending = false }: ActionButtonsProps) => {
	return (
		<View className="flex-row mt-2 mb-8 gap-x-4">
			<TouchableOpacity 
				className={`flex-1 ${isPending ? 'bg-indigo-400' : 'bg-indigo-600'} py-3.5 rounded-xl items-center`}
				onPress={onCreate}
				disabled={isPending}
			>
				<TextComponent className="text-white font-semibold text-base">
					{isPending ? 'Creating...' : 'Create'}
				</TextComponent>
			</TouchableOpacity>
			
			<TouchableOpacity 
				className="flex-1 bg-white border border-gray-300 py-3.5 rounded-xl items-center"
				onPress={onSaveDraft}
				disabled={isPending}
			>
				<TextComponent className="text-gray-900 font-semibold text-base">Save as Draft</TextComponent>
			</TouchableOpacity>
		</View>
	);
});

ActionButtons.displayName = 'ActionButtons';
export default ActionButtons;
