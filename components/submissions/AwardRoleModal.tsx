import { Award, CheckCircle2, Shield, Star, X } from 'lucide-react-native';
import React, { memo } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';
import { SubmissionData } from './SubmissionCard';

interface AwardRoleModalProps {
	visible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	submission: SubmissionData | null;
}

const AwardRoleModal = memo(
	({ visible, onClose, onConfirm, submission }: AwardRoleModalProps) => {
		if (!submission) return null;

		return (
			<Modal
				visible={visible}
				transparent
				animationType="fade"
				onRequestClose={onClose}
			>
				<View className="flex-1 bg-black/50 justify-center items-center p-4">
					<View className="bg-[#EAF6F6] w-full max-w-md rounded-2xl overflow-hidden shadow-xl border border-gray-100">
						{/* Header */}
						<View className="p-5 pb-3 flex-row justify-between items-center">
							<View className="flex-row items-center">
								<Award size={24} color="#FBBF24" className="mr-2" />
								<TextComponent className="text-xl font-bold text-gray-900">
									Award Role
								</TextComponent>
							</View>
							<TouchableOpacity onPress={onClose} className="p-1">
								<X size={24} color="#6B7280" />
							</TouchableOpacity>
						</View>
						<TextComponent className="px-5 text-sm text-gray-700 mb-4">
							Confirm role award and generate NFT Rights Certificate
						</TextComponent>

						<View className="px-5 pb-5">
							{/* Success/Confirmation Box */}
							<View className="bg-white border border-green-200 rounded-lg p-3 mb-4">
								<View className="flex-row items-center mb-1">
									<CheckCircle2 size={16} color="#10B981" className="mr-2" />
									<TextComponent className="text-green-600 outline font-semibold text-sm">
										Role Awarded Successfully!
									</TextComponent>
								</View>
								<TextComponent className="text-green-700 text-xs leading-relaxed">
									{submission.talentName} has been selected for the role "
									{submission.role}".
								</TextComponent>
							</View>

							{/* NFT Certificate Box */}
							<View className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-5 items-center relative mb-6 content-center">
								{/* Shield Icon inside circle */}
								<View className="w-16 h-16 bg-indigo-50 border-4 border-white rounded-full items-center justify-center -mt-9 shadow-sm mb-3">
									<View className="bg-indigo-600 rounded-full p-2">
										<Shield size={20} color="white" />
									</View>
								</View>

								<TextComponent className="font-bold text-gray-900 text-base mb-1">
									NFT Rights Certificate
								</TextComponent>
								<TextComponent className="text-xs text-gray-500 mb-5">
									Blockchain-verified role ownership
								</TextComponent>

								<View className="w-full border-t border-gray-100 mb-4" />

								<View className="w-full flex-row justify-between mb-4">
									<View className="flex-1 pr-2">
										<TextComponent className="text-xs text-gray-500 mb-1">
											Talent:
										</TextComponent>
										<TextComponent className="text-sm font-semibold text-gray-900">
											{submission.talentName}
										</TextComponent>
									</View>
									<View className="flex-1 pl-2">
										<TextComponent className="text-xs text-gray-500 mb-1">
											Role:
										</TextComponent>
										<TextComponent className="text-sm font-semibold text-gray-900" numberOfLines={2}>
											{submission.role}
										</TextComponent>
									</View>
								</View>

								<View className="w-full flex-row justify-between mb-4">
									<View className="flex-1 pr-2">
										<TextComponent className="text-xs text-gray-500 mb-1">
											Certificate ID:
										</TextComponent>
										<TextComponent className="text-sm font-semibold text-gray-900">
											CGL-{Math.floor(10000000 + Math.random() * 90000000)}
										</TextComponent>
									</View>
									<View className="flex-1 pl-2">
										<TextComponent className="text-xs text-gray-500 mb-1">
											Blockchain:
										</TextComponent>
										<TextComponent className="text-sm font-semibold text-gray-900">
											Ethereum
										</TextComponent>
									</View>
								</View>

								<View className="w-full border-t border-gray-100 mb-4" />

								<View className="flex-row items-center justify-center w-full">
									<Star size={16} color="#FBBF24" fill="#FBBF24" className="mr-2" />
									<TextComponent className="text-sm font-medium text-gray-800">
										Verified on Blockchain
									</TextComponent>
								</View>
							</View>

							{/* Actions */}
							<View className="flex-row justify-between gap-3">
								<TouchableOpacity
									onPress={onClose}
									className="flex-1 py-3 px-4 rounded-lg bg-white border border-gray-300 items-center justify-center"
								>
									<TextComponent className="text-gray-900 font-bold">
										Cancel
									</TextComponent>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={onConfirm}
									className="flex-1 py-3 px-4 rounded-lg bg-[#6366F1] items-center justify-center shadow-lg shadow-indigo-500/30"
								>
									<TextComponent className="text-white font-bold">
										Confirm Award
									</TextComponent>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		);
	}
);

AwardRoleModal.displayName = 'AwardRoleModal';

export default AwardRoleModal;
