import React from 'react';
import { ScrollView, Text } from 'react-native';

const PhysicalTab = () => {
	return (
		<ScrollView className="flex-1 bg-[#AFEEEE] p-4">
			<Text className="text-lg font-bold text-gray-800">
				Physical Attributes
			</Text>
			<Text className="text-gray-600 mt-2">Physical details will go here.</Text>
		</ScrollView>
	);
};

export default PhysicalTab;
