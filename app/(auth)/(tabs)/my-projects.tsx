import React from 'react';
import { SafeAreaView, View } from 'react-native';
import TextComponent from '../../../components/TextComponent';

export default function MyProjectsScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 items-center justify-center px-6">
				<TextComponent className="text-2xl font-bold text-gray-900 mb-2">
					My Projects
				</TextComponent>
				<TextComponent size="small" className="text-gray-500">
					Your casting projects will appear here
				</TextComponent>
			</View>
		</SafeAreaView>
	);
}
