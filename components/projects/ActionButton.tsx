import { Trash2 } from 'lucide-react-native';
import React, { memo } from 'react';
import TextComponent from '../TextComponent';
// Wait, we'll use react-native's TouchableOpacity to be safe.
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

interface ActionButtonProps {
	label?: string;
	onPress: () => void;
	variant?: 'primary' | 'delete';
}

const ActionButton = memo(({ label, onPress, variant = 'primary' }: ActionButtonProps) => {
	if (variant === 'delete') {
		return (
			<RNTouchableOpacity
				onPress={onPress}
				activeOpacity={0.7}
				className="p-2 rounded-lg justify-center items-center"
			>
				<Trash2 size={20} color="#000" />
			</RNTouchableOpacity>
		);
	}

	return (
		<RNTouchableOpacity
			onPress={onPress}
			activeOpacity={0.7}
			className="flex-1 py-1.5 rounded-md bg-[#E0F7F7] border border-[#B2EBF2] items-center justify-center mr-2"
		>
			<TextComponent className="text-[#004D40] text-sm font-medium">
				{label}
			</TextComponent>
		</RNTouchableOpacity>
	);
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;
