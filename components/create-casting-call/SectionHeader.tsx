import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
}

const SectionHeader = memo(({ title, subtitle }: SectionHeaderProps) => {
	return (
		<View className="mb-4 mt-6">
			<TextComponent className="text-lg font-bold text-gray-900">
				{title}
			</TextComponent>
			{subtitle && (
				<TextComponent className="text-sm text-gray-700 mt-1 leading-5">
					{subtitle}
				</TextComponent>
			)}
		</View>
	);
});

SectionHeader.displayName = 'SectionHeader';
export default SectionHeader;
