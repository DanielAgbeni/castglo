import { Image } from 'expo-image';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface ChatHeaderProps {
	name: string;
	role: string;
	avatar: string;
	onBack: () => void;
	onMore?: () => void;
}

const ChatHeader = memo(({ name, role, avatar, onBack, onMore }: ChatHeaderProps) => {
	return (
		<View className="flex-row items-center px-3 py-3 bg-white border-b border-gray-100 gap-2.5">
			<TouchableOpacity onPress={onBack} className="p-1" hitSlop={8}>
				<ChevronLeft size={26} color="#1F2937" />
			</TouchableOpacity>

			<Image
				source={{ uri: avatar }}
				className="w-10 h-10 rounded-full bg-gray-200"
				contentFit="cover"
				transition={200}
			/>

			<View className="flex-1">
				<TextComponent className="text-lg font-bold text-gray-900" numberOfLines={1}>
					{name}
				</TextComponent>
				<TextComponent className="text-xs text-indigo-500 font-semibold">
					{role}
				</TextComponent>
			</View>

			<TouchableOpacity onPress={onMore} className="p-1" hitSlop={8}>
				<MoreVertical size={22} color="#6B7280" />
			</TouchableOpacity>
		</View>
	);
});

ChatHeader.displayName = 'ChatHeader';
export default ChatHeader;
