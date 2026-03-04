import TextComponent from '@/components/TextComponent';
import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Services() {
	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View style={{ flex: 1, backgroundColor: '#AFEEEE' }}>
				{/* Header */}
				<View className="bg-white px-5 py-4 pb-4">
					<View className="flex-row items-center justify-between">
						<TextComponent className="text-2xl font-bold">Services</TextComponent>
					</View>
				</View>

				{/* Content */}
				<View className="flex-1 items-center justify-center px-4">
					<TextComponent className="text-gray-600 text-center">
						Manage your offered services here.
					</TextComponent>
				</View>
			</View>
		</SafeAreaView>
	);
}
