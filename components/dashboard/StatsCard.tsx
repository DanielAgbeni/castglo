import { LucideIcon } from 'lucide-react-native';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface StatsCardProps {
	title: string;
	count: number | string;
	Icon: LucideIcon;
	iconColor?: string;
	bgColor?: string;
}

const StatsCard = memo(
	({ title, count, Icon, iconColor = '#000', bgColor }: StatsCardProps) => {
		return (
			<View
				style={{ backgroundColor: bgColor || '#fff' }}
				className={`p-4 rounded-2xl shadow-sm flex-1 mr-2 last:mr-0 min-w-[45%]`}>
				<View className="mb-2">
					<Icon
						size={24}
						color={iconColor}
					/>
				</View>
				<Text className="text-gray-600 text-sm mb-1">{title}</Text>
				<Text className="text-3xl font-bold text-black">{count}</Text>
			</View>
		);
	},
);

StatsCard.displayName = 'StatsCard';

export default StatsCard;
