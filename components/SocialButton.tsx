import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
	Image,
	ImageSourcePropType,
	Text,
	TouchableOpacity,
} from 'react-native';

interface SocialButtonProps {
	label: string;
	icon?: keyof typeof Ionicons.glyphMap;
	imageSource?: ImageSourcePropType;
	iconColor?: string;
	onPress?: () => void;
}

const SocialButton = memo(
	({
		label,
		icon,
		imageSource,
		iconColor = 'black',
		onPress,
	}: SocialButtonProps) => {
		return (
			<TouchableOpacity
				onPress={onPress}
				className="flex-row items-center justify-center border border-gray-200 rounded-xl py-4 gap-x-3 bg-white shadow-sm">
				{icon && (
					<Ionicons
						name={icon}
						size={24}
						color={iconColor}
					/>
				)}
				{imageSource && (
					<Image
						source={imageSource}
						className="w-6 h-6"
						resizeMode="contain"
					/>
				)}
				<Text className="text-black font-medium text-base">{label}</Text>
			</TouchableOpacity>
		);
	},
);

export default SocialButton;
