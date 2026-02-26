import { Paperclip, Send } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface ChatInputProps {
	onSend: (text: string) => void;
	onAttach?: () => void;
}

const ChatInput = memo(({ onSend, onAttach }: ChatInputProps) => {
	const [text, setText] = useState('');

	const handleSend = () => {
		const trimmed = text.trim();
		if (!trimmed) return;
		onSend(trimmed);
		setText('');
	};

	const hasText = text.trim().length > 0;

	return (
		<View className="flex-row items-end px-3 py-2.5 bg-white border-t border-gray-100 gap-2">
			<TouchableOpacity onPress={onAttach} className="p-2 mb-0.5" hitSlop={8}>
				<Paperclip size={20} color="#9CA3AF" />
			</TouchableOpacity>

			<TextInput
				value={text}
				onChangeText={setText}
				placeholder="Type your message..."
				placeholderTextColor="#9CA3AF"
				className="flex-1 bg-gray-50 rounded-2xl px-4 py-2.5 text-[15px] text-gray-800 border border-gray-200 max-h-[100px]"
				multiline
				maxLength={1000}
			/>

			<TouchableOpacity
				onPress={handleSend}
				className={`w-10 h-10 rounded-full items-center justify-center ${
					hasText ? 'bg-indigo-500' : 'bg-gray-200'
				}`}
				disabled={!hasText}>
				<Send size={20} color={hasText ? '#fff' : '#D1D5DB'} />
			</TouchableOpacity>
		</View>
	);
});

ChatInput.displayName = 'ChatInput';
export default ChatInput;
