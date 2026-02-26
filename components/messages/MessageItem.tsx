import { Image } from 'expo-image';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

export interface Conversation {
	id: string;
	name: string;
	role: string;
	avatar: string;
	lastMessage: string;
	timestamp: string;
	unread?: boolean;
	online?: boolean;
}

interface MessageItemProps {
	conversation: Conversation;
	onPress: (id: string) => void;
}

const MessageItem = memo(({ conversation, onPress }: MessageItemProps) => {
	const { id, name, role, avatar, lastMessage, timestamp, unread, online } =
		conversation;

	return (
		<TouchableOpacity
			activeOpacity={0.7}
			onPress={() => onPress(id)}
			className="flex-row bg-white rounded-2xl mb-3 overflow-hidden shadow-sm">
			{/* Accent bar */}
			<View
				className={`w-1 rounded-l-2xl ${unread ? 'bg-indigo-500' : 'bg-gray-300'}`}
			/>

			<View className="flex-1 flex-row items-center py-3.5 px-3.5 gap-3">
				{/* Avatar */}
				<View className="relative">
					<Image
						source={{ uri: avatar }}
						className="w-13 h-13 rounded-full bg-gray-200"
						contentFit="cover"
						transition={200}
					/>
					{online && (
						<View className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />
					)}
				</View>

				{/* Text content */}
				<View className="flex-1">
					<View className="flex-row justify-between items-center mb-0.5">
						<TextComponent className="text-base font-bold text-gray-900" numberOfLines={1}>
							{name}
						</TextComponent>
						<TextComponent className="text-xs text-gray-400">{timestamp}</TextComponent>
					</View>
					<TextComponent className="text-xs text-indigo-500 font-semibold mb-0.5">
						{role}
					</TextComponent>
					<TextComponent className="text-sm text-gray-500" numberOfLines={1}>
						{lastMessage}
					</TextComponent>
				</View>

				{/* Unread indicator */}
				{unread && <View className="w-2.5 h-2.5 rounded-full bg-indigo-500 self-center" />}
			</View>
		</TouchableOpacity>
	);
});

MessageItem.displayName = 'MessageItem';
export default MessageItem;
