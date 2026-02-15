import React from 'react';
import { ScrollView, Text } from 'react-native';

const SkillsTab = () => {
	return (
		<ScrollView className="flex-1 bg-[#AFEEEE] p-4">
			<Text className="text-lg font-bold text-gray-800">Skills</Text>
			<Text className="text-gray-600 mt-2">Skills selection will go here.</Text>
		</ScrollView>
	);
};

export default SkillsTab;
