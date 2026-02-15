import React from 'react';
import { ScrollView, Text } from 'react-native';

const EducationTab = () => {
	return (
		<ScrollView className="flex-1 bg-[#AFEEEE] p-4">
			<Text className="text-lg font-bold text-gray-800">Education</Text>
			<Text className="text-gray-600 mt-2">
				Education history will go here.
			</Text>
		</ScrollView>
	);
};

export default EducationTab;
