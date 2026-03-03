import React, { memo } from 'react';
import { View } from 'react-native';
import TextComponent from '../TextComponent';
import ActionButton from './ActionButton';
import StatusBadge, { ProjectStatus } from './StatusBadge';

export interface ProjectData {
	id: string;
	title: string;
	status: ProjectStatus;
	category: string;
	description: string;
	submissions: number;
	deadline: string;
	location: string;
	tag?: string;
}

interface ProjectCardProps {
	project: ProjectData;
	onView: (id: string) => void;
	onEdit: (id: string) => void;
	onDelete: (id: string) => void;
}

const StatRow = memo(({ label, value }: { label: string; value: string | number }) => (
	<View className="flex-row justify-between items-center mb-1">
		<TextComponent className="text-xs text-gray-600">{label}</TextComponent>
		<TextComponent className="text-xs font-bold text-gray-900">{value}</TextComponent>
	</View>
));

StatRow.displayName = 'StatRow';

const ProjectCard = memo(({ project, onView, onEdit, onDelete }: ProjectCardProps) => {
	const {
		id,
		title,
		status,
		category,
		description,
		submissions,
		deadline,
		location,
		tag,
	} = project;

	return (
		<View className="bg-white rounded-xl p-4 mb-4 border border-[#A0D2D2]">
			{/* Header area with Title and Badge */}
			<View className="flex-row justify-between items-start mb-1">
				<TextComponent className="text-base font-bold text-gray-900 flex-1 mr-2">
					{title}
				</TextComponent>
				<StatusBadge status={status} />
			</View>

			{/* Category */}
			<TextComponent className="text-sm text-gray-500 mb-2">
				{category}
			</TextComponent>

			{/* Description */}
			<TextComponent className="text-sm text-gray-800 mb-4 leading-5">
				{description}
			</TextComponent>

			{/* Stats */}
			<View className="mb-4">
				<StatRow label="Submissions:" value={submissions} />
				<StatRow label="Deadline:" value={deadline} />
				<StatRow label="Location:" value={location} />
			</View>

			{/* Tag (if any) */}
			{tag && (
				<View className="self-start px-2 py-1 bg-[#E8FAFA] border border-[#B2EBF2] rounded mb-4">
					<TextComponent className="text-[10px] text-gray-700">
						{tag}
					</TextComponent>
				</View>
			)}

			{/* Actions */}
			<View className="flex-row items-center justify-between">
				<ActionButton
					label="View"
					onPress={() => onView(id)}
				/>
				<ActionButton
					label="Edit"
					onPress={() => onEdit(id)}
				/>
				<ActionButton
					variant="delete"
					onPress={() => onDelete(id)}
				/>
			</View>
		</View>
	);
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
