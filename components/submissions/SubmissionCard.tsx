import { Play } from 'lucide-react-native';
import React, { memo, useCallback } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';
import StatusBadge, { SubmissionStatus } from './StatusBadge';

export interface SubmissionData {
	id: string;
	talentName: string;
	talentInitials: string;
	location: string;
	role: string;
	submittedDate: string;
	experience: string;
	thumbnailUrl?: string;
	notes: string;
	status: SubmissionStatus;
}

interface SubmissionCardProps {
	submission: SubmissionData;
	onPreview: (id: string) => void;
	onApprove: (id: string, name: string) => void;
	onReject: (id: string, name: string) => void;
	onAward: (id: string, name: string) => void;
}

const SubmissionCard = memo(
	({
		submission,
		onPreview,
		onApprove,
		onReject,
		onAward,
	}: SubmissionCardProps) => {
		const handlePreview = useCallback(() => {
			onPreview(submission.id);
		}, [onPreview, submission.id]);

		const handleApprove = useCallback(() => {
			onApprove(submission.id, submission.talentName);
		}, [onApprove, submission.id, submission.talentName]);

		const handleReject = useCallback(() => {
			onReject(submission.id, submission.talentName);
		}, [onReject, submission.id, submission.talentName]);

		const handleAward = useCallback(() => {
			onAward(submission.id, submission.talentName);
		}, [onAward, submission.id, submission.talentName]);

		return (
			<View className="bg-white rounded-xl border-[3px] border-[#AFEEEE] p-4 mb-4">
				{/* Header: Avatar, Name, Location, Status */}
				<View className="flex-row justify-between items-start mb-4">
					<View className="flex-row items-center flex-1">
						<View className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center mr-3">
							<TextComponent className="text-gray-600 font-bold text-lg">
								{submission.talentInitials}
							</TextComponent>
						</View>
						<View className="flex-1">
							<TextComponent className="text-base font-bold text-gray-900">
								{submission.talentName}
							</TextComponent>
							<TextComponent className="text-xs text-gray-500">
								{submission.location}
							</TextComponent>
						</View>
					</View>
					<StatusBadge status={submission.status} />
				</View>

				{/* Role Information */}
				<View className="mb-3">
					<TextComponent className="text-sm font-bold text-gray-800">
						{submission.role}
					</TextComponent>
					<TextComponent className="text-xs text-gray-500">
						Submitted {submission.submittedDate}
					</TextComponent>
				</View>

				{/* Experience */}
				<View className="flex-row mb-3">
					<TextComponent className="text-sm text-gray-600 w-24">
						Experience:
					</TextComponent>
					<TextComponent className="text-sm font-bold text-gray-800">
						{submission.experience}
					</TextComponent>
				</View>

				{/* Video Thumbnail */}
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={handlePreview}
					className="w-full h-40 bg-gray-300 rounded-lg overflow-hidden mb-3 relative justify-center items-center"
				>
					{submission.thumbnailUrl ? (
						<Image
							source={{ uri: submission.thumbnailUrl }}
							className="w-full h-full absolute"
							resizeMode="cover"
						/>
					) : (
						<View className="w-full h-full bg-gray-400 absolute" />
					)}
					<View className="bg-black/40 w-full h-full absolute" />
					<View className="flex-row items-center bg-transparent">
						<View className="w-10 h-10 rounded-full border border-white items-center justify-center mr-2">
							<Play size={20} color="white" fill="transparent" />
						</View>
						<TextComponent className="text-white font-bold text-sm">
							Preview Audition
						</TextComponent>
					</View>
				</TouchableOpacity>

				{/* Description / Notes */}
				<TextComponent className="text-sm text-gray-600 mb-4 line-clamp-2">
					{submission.notes}
				</TextComponent>

				{/* Action Buttons based on Status */}
				{submission.status === 'pending' && (
					<View className="flex-row justify-between space-x-3 gap-3">
						<TouchableOpacity
							onPress={handleApprove}
							className="flex-1 bg-[#bbeded] py-3 rounded-lg items-center"
						>
							<TextComponent className="text-teal-800 font-bold">
								Approve
							</TextComponent>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={handleReject}
							className="flex-1 bg-[#bbeded] py-3 rounded-lg items-center"
						>
							<TextComponent className="text-teal-800 font-bold">
								Reject
							</TextComponent>
						</TouchableOpacity>
					</View>
				)}

				{submission.status === 'approved' && (
					<TouchableOpacity
						onPress={handleAward}
						className="w-full bg-[#6366F1] py-3 rounded-lg items-center"
					>
						<TextComponent className="text-white font-bold">
							Award Role
						</TextComponent>
					</TouchableOpacity>
				)}

				{submission.status === 'rejected' && (
					<View className="w-full bg-[#e8f6f6] py-3 rounded-lg items-center">
						<TextComponent className="text-gray-500 font-bold">
							Rejected
						</TextComponent>
					</View>
				)}
			</View>
		);
	}
);

SubmissionCard.displayName = 'SubmissionCard';

export default SubmissionCard;
