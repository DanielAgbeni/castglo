import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
	status: SubmissionStatus;
}

const statusConfig: Record<SubmissionStatus, { bg: string; text: string }> = {
	pending: { bg: 'bg-[#F59E0B]', text: 'text-white' }, // Amber
	approved: { bg: 'bg-[#10B981]', text: 'text-white' }, // Green
	rejected: { bg: 'bg-[#EF4444]', text: 'text-white' }, // Red
};

const StatusBadge = memo(({ status }: StatusBadgeProps) => {
	const config = statusConfig[status] || statusConfig.pending;

	return (
		<View className={`px-3 py-1 rounded-md ${config.bg}`}>
			<TextComponent className={`text-xs font-bold capitalize ${config.text}`}>
				{status}
			</TextComponent>
		</View>
	);
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;
