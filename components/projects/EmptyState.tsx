import { FolderX } from 'lucide-react-native';
import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

interface EmptyStateProps {
	message?: string;
}

const EmptyState = memo(({ message = 'No projects found.' }: EmptyStateProps) => {
	return (
		<View className="flex-1 items-center justify-center py-20">
			<FolderX size={48} color="#9CA3AF" />
			<TextComponent className="text-gray-500 mt-4 text-base">
				{message}
			</TextComponent>
		</View>
	);
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
