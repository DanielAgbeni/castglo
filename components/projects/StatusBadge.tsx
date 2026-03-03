import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

export type ProjectStatus = 'Open' | 'Closed' | 'Draft';

interface StatusBadgeProps {
	status: ProjectStatus;
}

const statusConfig: Record<ProjectStatus, { bg: string; text: string }> = {
	Open: { bg: 'bg-[#10B981]', text: 'text-white' }, // Green
	Closed: { bg: 'bg-[#9CA3AF]', text: 'text-white' }, // Gray
	Draft: { bg: 'bg-[#F59E0B]', text: 'text-white' }, // Amber
};

const StatusBadge = memo(({ status }: StatusBadgeProps) => {
	const config = statusConfig[status] || statusConfig.Open;

	return (
		<View className={`px-2 py-0.5 rounded ${config.bg}`}>
			<TextComponent className={`text-[10px] font-bold ${config.text}`}>
				{status}
			</TextComponent>
		</View>
	);
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
