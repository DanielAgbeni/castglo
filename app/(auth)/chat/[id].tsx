import ChatBubble, { Message } from '@/components/messages/ChatBubble';
import ChatHeader from '@/components/messages/ChatHeader';
import ChatInput from '@/components/messages/ChatInput';
import { FlashList } from '@shopify/flash-list';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONTACT_MAP: Record<string, { name: string; role: string; avatar: string }> = {
	'1': {
		name: 'David Chen',
		role: 'Casting Director',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
	},
	'2': {
		name: 'Sarah Mitchell',
		role: 'Producer',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
	},
	'3': {
		name: 'Emma Rodriguez',
		role: 'Talent Agent',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
	},
	'4': {
		name: 'Michael Torres',
		role: 'Director',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
	},
	'5': {
		name: 'Lisa Park',
		role: 'Talent Manager',
		avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
	},
};

const INITIAL_MESSAGES: Message[] = [
	{
		id: '1',
		text: 'Hi Jordan! I reviewed your audition tape for the indie drama role.',
		timestamp: '12:53 PM',
		isSent: false,
	},
	{
		id: '2',
		text: "Thank you! I'm really excited about this opportunity.",
		timestamp: '12:59 PM',
		isSent: true,
	},
	{
		id: '3',
		text: "Your performance was impressive. We'd like to schedule a callback for next Tuesday.",
		timestamp: '1:03 PM',
		isSent: false,
	},
	{
		id: '4',
		text: "That sounds great! I'll make sure to keep my schedule open. What time works best?",
		timestamp: '1:10 PM',
		isSent: true,
	},
	{
		id: '5',
		text: "Let's aim for 2 PM. I'll send over the sides this evening so you can prepare.",
		timestamp: '1:15 PM',
		isSent: false,
	},
];

export default function ChatScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const contact = CONTACT_MAP[id ?? '1'] ?? CONTACT_MAP['1'];

	const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

	const handleSend = useCallback((text: string) => {
		const newMsg: Message = {
			id: Date.now().toString(),
			text,
			timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
			isSent: true,
		};
		setMessages((prev) => [...prev, newMsg]);
	}, []);

	const handleBack = useCallback(() => {
		router.back();
	}, [router]);

	const renderItem = useCallback(
		({ item }: { item: Message }) => <ChatBubble message={item} />,
		[],
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: '#AFEEEE' }}
			edges={['top']}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
				<ChatHeader
					name={contact.name}
					role={contact.role}
					avatar={contact.avatar}
					onBack={handleBack}
				/>

				<View className="flex-1 bg-[#AFEEEE]">
					<FlashList
						data={messages}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingVertical: 16 }}
						keyExtractor={(item) => item.id}
					/>
				</View>

				<ChatInput onSend={handleSend} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
