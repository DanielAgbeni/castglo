import MessageItem, { Conversation } from '@/components/messages/MessageItem';
import TextComponent from '@/components/TextComponent';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Plus, SlidersHorizontal } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CONVERSATIONS: Conversation[] = [
	{
		id: '1',
		name: 'David Chen',
		role: 'Casting Director',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
		lastMessage: "Thanks for your audition submission. We'll be in touch soon!",
		timestamp: '2h ago',
		unread: true,
		online: true,
	},
	{
		id: '2',
		name: 'Sarah Mitchell',
		role: 'Producer',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
		lastMessage: 'Your performance was impressive. We would love to schedule a callback.',
		timestamp: '6h ago',
		unread: true,
		online: false,
	},
	{
		id: '3',
		name: 'Emma Rodriguez',
		role: 'Talent Agent',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
		lastMessage: 'Great work on your callback. Looking forward to the next steps.',
		timestamp: '1d ago',
		unread: false,
		online: true,
	},
	{
		id: '4',
		name: 'Michael Torres',
		role: 'Director',
		avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
		lastMessage: 'Can we schedule a chemistry read for next week?',
		timestamp: '2d ago',
		unread: false,
		online: false,
	},
	{
		id: '5',
		name: 'Lisa Park',
		role: 'Talent Manager',
		avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
		lastMessage: 'I have a few opportunities that might interest you.',
		timestamp: '3d ago',
		unread: false,
		online: false,
	},
];

export default function Messages() {
	const router = useRouter();

	const handleConversationPress = useCallback(
		(id: string) => {
			router.push(`/chat/${id}` as any);
		},
		[router],
	);

	const renderItem = useCallback(
		({ item }: { item: Conversation }) => (
			<MessageItem conversation={item} onPress={handleConversationPress} />
		),
		[handleConversationPress],
	);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: '#AFEEEE' }}
			edges={['top']}>
			<View className="flex-1 bg-[#AFEEEE]">
				{/* Header */}
				<View className="flex-row justify-between items-center px-5 pt-2 pb-3 bg-[#AFEEEE]">
					<TextComponent className="text-2xl font-bold text-gray-900">
						Messages
					</TextComponent>
					<TouchableOpacity className="w-10 h-10 rounded-xl bg-white/60 items-center justify-center">
						<SlidersHorizontal size={20} color="#6B7280" />
					</TouchableOpacity>
				</View>

				{/* New Message Button */}
				<View className="px-5 pb-4">
					<TouchableOpacity
						className="flex-row items-center justify-center bg-indigo-500 py-3 px-5 rounded-xl self-start shadow-md"
						activeOpacity={0.85}>
						<Plus size={18} color="#fff" strokeWidth={3} />
						<TextComponent className="text-white font-bold text-sm ml-1.5">
							New Message
						</TextComponent>
					</TouchableOpacity>
				</View>

				{/* Conversation List */}
				<FlashList
					data={CONVERSATIONS}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 20 }}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
}
