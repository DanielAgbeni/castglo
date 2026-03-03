import { FileText } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface ProjectsHeaderProps {
	title: string;
	onIconPress?: () => void;
}

const ProjectsHeader = memo(({ title, onIconPress }: ProjectsHeaderProps) => {
	return (
		<View className="flex-row items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
			<TextComponent className="text-xl font-bold text-gray-900">
				{title}
			</TextComponent>
			<TouchableOpacity
				onPress={onIconPress}
				className="p-1 rounded-lg border border-gray-800"
			>
				<FileText size={20} color="#000" />
			</TouchableOpacity>
		</View>
	);
});

ProjectsHeader.displayName = 'ProjectsHeader';

export default ProjectsHeader;
