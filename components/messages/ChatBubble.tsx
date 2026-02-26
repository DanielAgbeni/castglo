import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

export interface Message {
	id: string;
	text: string;
	timestamp: string;
	isSent: boolean;
}

interface ChatBubbleProps {
	message: Message;
}

const ChatBubble = memo(({ message }: ChatBubbleProps) => {
	const { text, timestamp, isSent } = message;

	return (
		<View
			className={`mb-2 px-4 max-w-[80%] ${isSent ? 'self-end' : 'self-start'}`}>
			<View
				className={`rounded-2xl py-2.5 px-4 ${
					isSent
						? 'bg-indigo-500 rounded-br-sm'
						: 'bg-gray-100 rounded-bl-sm'
				}`}>
				<TextComponent
					className={`text-[15px] leading-[21px] ${
						isSent ? 'text-white' : 'text-gray-800'
					}`}>
					{text}
				</TextComponent>
			</View>
			<TextComponent
				className={`text-[11px] text-gray-400 mt-1 ${
					isSent ? 'text-right' : 'text-left'
				}`}>
				{timestamp}
			</TextComponent>
		</View>
	);
});

ChatBubble.displayName = 'ChatBubble';
export default ChatBubble;
