import { Calendar, Clock, Users } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface CastingCallCardProps {
	title: string;
	status: 'Open' | 'Closed';
	description: string;
	submissions: number;
	deadline: string;
	createdDate: string;
	projectName?: string;
	location?: string;
	viewCount?: number;
	onView?: () => void;
	onManage?: () => void;
}

const CastingCallCard = memo(
	({
		title,
		status,
		description,
		submissions,
		deadline,
		createdDate,
		projectName,
		location,
		viewCount,
		onView,
		onManage,
	}: CastingCallCardProps) => {
		const isOpen = status === 'Open';

		return (
			<View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
				{/* Header row */}
				<View className="flex-row items-start justify-between mb-2">
					<TextComponent className="text-lg font-bold flex-1 mr-2">
						{title}
					</TextComponent>
					<View
						className={`px-3 py-1 rounded-full ${isOpen ? 'bg-emerald-100' : 'bg-gray-200'}`}>
						<TextComponent
							className={`text-xs font-semibold ${isOpen ? 'text-emerald-700' : 'text-gray-600'}`}>
							{status}
						</TextComponent>
					</View>
				</View>

				<TextComponent className="text-gray-500 text-sm mb-2">
					{description}
				</TextComponent>

				{(projectName || location) && (
					<View className="mb-3">
						{projectName && (
							<TextComponent className="text-gray-700 text-sm">
								Project: {projectName}
							</TextComponent>
						)}
						{location && (
							<TextComponent className="text-gray-600 text-sm font-normal">
								Location: {location}
							</TextComponent>
						)}
					</View>
				)}

				{/* Metadata */}
				<View className="gap-y-2 mb-4">
					<View className="flex-row items-center gap-x-2">
						<Users
							size={16}
							color="#6B7280"
						/>
						<TextComponent className="text-gray-600 text-sm font-normal">
							{submissions} submissions
							{typeof viewCount === 'number' ? ` • ${viewCount} views` : ''}
						</TextComponent>
					</View>
					<View className="flex-row items-center gap-x-2">
						<Clock
							size={16}
							color="#6B7280"
						/>
						<TextComponent className="text-gray-600 text-sm font-normal">
							Deadline: {deadline}
						</TextComponent>
					</View>
					<View className="flex-row items-center gap-x-2">
						<Calendar
							size={16}
							color="#6B7280"
						/>
						<TextComponent className="text-gray-600 text-sm font-normal">
							Created: {createdDate}
						</TextComponent>
					</View>
				</View>

				{/* Actions */}
				<View className="flex-row gap-x-3">
					<TouchableOpacity
						onPress={onView}
						className="flex-1 py-2.5 rounded-lg border border-indigo-600 items-center"
						activeOpacity={0.7}>
						<TextComponent className="text-indigo-600 font-semibold">
							View
						</TextComponent>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={onManage}
						className="flex-1 py-2.5 rounded-lg bg-indigo-600 items-center"
						activeOpacity={0.7}>
						<TextComponent className="text-white font-semibold">
							Manage
						</TextComponent>
					</TouchableOpacity>
				</View>
			</View>
		);
	},
);

CastingCallCard.displayName = 'CastingCallCard';

export default CastingCallCard;
