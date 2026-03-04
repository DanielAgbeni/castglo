import { Play, X } from 'lucide-react-native';
import React, { memo } from 'react';
import { Image, Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';
import StatusBadge from './StatusBadge';
import { SubmissionData } from './SubmissionCard';

interface AuditionPreviewModalProps {
	visible: boolean;
	onClose: () => void;
	submission: SubmissionData | null;
}

const AuditionPreviewModal = memo(
	({ visible, onClose, submission }: AuditionPreviewModalProps) => {
		if (!submission) return null;

		return (
			<Modal
				visible={visible}
				transparent
				animationType="fade"
				onRequestClose={onClose}
			>
				<View className="flex-1 bg-black/50 justify-center items-center p-4">
					<View className="bg-[#AFEEEE] w-full max-w-md rounded-2xl overflow-hidden shadow-xl border-[4px] border-[#AFEEEE]">
						{/* Header */}
						<View className="p-4 flex-row justify-between items-start bg-[#AFEEEE]">
							<View className="flex-1 pr-4">
								<TextComponent className="text-xl font-bold text-gray-900 mb-1">
									Audition Preview
								</TextComponent>
								<TextComponent className="text-sm text-gray-800">
									{submission.talentName} - {submission.role}
								</TextComponent>
							</View>
							<TouchableOpacity
								onPress={onClose}
								className="p-2 bg-black/10 rounded-full"
							>
								<X size={20} color="#1F2937" />
							</TouchableOpacity>
						</View>

						<ScrollView
							showsVerticalScrollIndicator={false}
							contentContainerStyle={{ padding: 16 }}
							className="bg-[#AFEEEE]"
						>
							{/* Large Video Player Mock */}
							<View className="w-full h-56 bg-gray-300 rounded-xl overflow-hidden mb-6 relative justify-center items-center border border-white/30">
								{submission.thumbnailUrl ? (
									<Image
										source={{ uri: submission.thumbnailUrl }}
										className="w-full h-full absolute"
										resizeMode="cover"
									/>
								) : (
									<View className="w-full h-full bg-gray-400 absolute" />
								)}
								<View className="bg-black/30 w-full h-full absolute" />
								<View className="w-14 h-14 rounded-full border border-white items-center justify-center">
									<Play size={24} color="white" fill="transparent" />
								</View>
							</View>

							{/* Talent Information */}
							<TextComponent className="text-base font-bold text-gray-900 mb-2">
								Talent Information
							</TextComponent>
							<View className="mb-5">
								<View className="flex-row mb-1">
									<TextComponent className="text-sm text-gray-700 w-24">
										Name:
									</TextComponent>
									<TextComponent className="text-sm text-gray-900 font-medium">
										{submission.talentName}
									</TextComponent>
								</View>
								<View className="flex-row mb-1">
									<TextComponent className="text-sm text-gray-700 w-24">
										Location:
									</TextComponent>
									<TextComponent className="text-sm text-gray-900 font-medium">
										{submission.location}
									</TextComponent>
								</View>
								<View className="flex-row">
									<TextComponent className="text-sm text-gray-700 w-24">
										Experience:
									</TextComponent>
									<TextComponent className="text-sm text-gray-900 font-medium">
										{submission.experience}
									</TextComponent>
								</View>
							</View>

							{/* Submission Details */}
							<TextComponent className="text-base font-bold text-gray-900 mb-2">
								Submission Details
							</TextComponent>
							<View className="mb-5">
								<View className="flex-row mb-1">
									<TextComponent className="text-sm text-gray-700 w-24">
										Role:
									</TextComponent>
									<TextComponent className="text-sm text-gray-900 font-medium flex-1">
										{submission.role}
									</TextComponent>
								</View>
								<View className="flex-row mb-2">
									<TextComponent className="text-sm text-gray-700 w-24">
										Submitted:
									</TextComponent>
									<TextComponent className="text-sm text-gray-900 font-medium">
										{submission.submittedDate}
									</TextComponent>
								</View>
								<View className="flex-row items-center">
									<TextComponent className="text-sm text-gray-700 w-24">
										Status:
									</TextComponent>
									<StatusBadge status={submission.status} />
								</View>
							</View>

							{/* Notes */}
							<TextComponent className="text-base font-bold text-gray-900 mb-2">
								Notes
							</TextComponent>
							<TextComponent className="text-sm text-gray-800 leading-relaxed mb-4">
								{submission.notes}
							</TextComponent>
						</ScrollView>
					</View>
				</View>
			</Modal>
		);
	}
);

AuditionPreviewModal.displayName = 'AuditionPreviewModal';

export default AuditionPreviewModal;
