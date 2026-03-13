import {
	useCastingCall,
	useCloseCastingCall,
	useDeleteCastingCall,
	useUpdateCastingCall,
} from '@/api/casting-call';
import ConfirmActionModal from '@/components/modals/ConfirmActionModal';
import TextComponent from '@/components/TextComponent';
import {
	formatDate,
	getLocationLabel,
	PROJECT_TYPE_LABELS,
} from '@/lib/castingCallUtils';
import { useAppStore } from '@/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Eye, MapPin, Users } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SectionCard = React.memo(
	({ children }: { children: React.ReactNode }) => (
		<View className="bg-white rounded-2xl p-4 mb-6 shadow-sm">{children}</View>
	),
);

const SectionLabel = React.memo(
	({ children }: { children: React.ReactNode }) => (
		<TextComponent className="text-[11px] font-semibold text-gray-500 tracking-wide mb-3">
			{children}
		</TextComponent>
	),
);

const StatItem = React.memo(
	({
		icon,
		label,
		value,
	}: {
		icon: React.ReactNode;
		label: string;
		value: string | number;
	}) => (
		<View className="flex-1">
			<View className="flex-row items-center gap-x-2 mb-1">
				{icon}
				<TextComponent className="text-xs text-gray-500">{label}</TextComponent>
			</View>

			<TextComponent className="text-sm font-semibold text-gray-900">
				{value}
			</TextComponent>
		</View>
	),
);

export default function CastingCallDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();

	const isDirector =
		useAppStore((s) => s.getActiveRole()) === 'casting_director';

	const [isEditing, setIsEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState('');
	const [editedDescription, setEditedDescription] = useState('');
	const [editedProjectName, setEditedProjectName] = useState('');

	const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

	const { data, isLoading, isError } = useCastingCall(id);
	const castingCall = useMemo(() => data?.data, [data]);

	const { mutate: updateCastingCall, isPending: isUpdating } =
		useUpdateCastingCall();

	const { mutate: closeCastingCall, isPending: isClosing } =
		useCloseCastingCall();

	const { mutate: deleteCastingCall, isPending: isDeleting } =
		useDeleteCastingCall();

	const handleStartEdit = () => {
		if (!castingCall) return;

		setEditedTitle(castingCall.title);
		setEditedDescription(castingCall.description);
		setEditedProjectName(castingCall.projectName);
		setIsEditing(true);
	};

	const handleSaveEdit = () => {
		if (!castingCall) return;

		updateCastingCall(
			{
				id: castingCall._id,
				data: {
					...castingCall,
					title: editedTitle,
					description: editedDescription,
					projectName: editedProjectName,
				},
			},
			{ onSuccess: () => setIsEditing(false) },
		);
	};

	if (isLoading || !castingCall) {
		return (
			<SafeAreaView
				className="flex-1 bg-[#9EDDD6]"
				edges={['top']}>
				<View className="flex-1 items-center justify-center">
					<TextComponent>Loading...</TextComponent>
				</View>
			</SafeAreaView>
		);
	}

	if (isError) {
		return (
			<SafeAreaView
				className="flex-1 bg-[#9EDDD6]"
				edges={['top']}>
				<View className="flex-1 items-center justify-center">
					<TextComponent>Error loading casting call</TextComponent>
				</View>
			</SafeAreaView>
		);
	}

	const createdBy =
		typeof castingCall.createdBy !== 'string' ? castingCall.createdBy : null;

	const isOpen = castingCall.status === 'open';

	return (
		<SafeAreaView
			className="flex-1 bg-[#9EDDD6]"
			edges={['top']}>
			{/* Back */}
			<View className="px-4 pt-3">
				<TouchableOpacity
					onPress={() => router.back()}
					className="h-9 w-9 bg-white/60 rounded-full items-center justify-center">
					<ArrowLeft
						size={18}
						color="#111827"
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 16,
					paddingBottom: 120,
				}}>
				{/* Header Card */}
				<View className="bg-white rounded-2xl p-4 mb-6 shadow-sm mt-2">
					<View className="flex-row items-start justify-between">
						<View className="flex-1 pr-3">
							<TextComponent
								numberOfLines={2}
								className="text-[18px] font-bold text-gray-900">
								{isEditing ? editedTitle : castingCall.title}
							</TextComponent>

							<TextComponent className="text-sm text-gray-500 mt-1">
								{isEditing ? editedProjectName : castingCall.projectName}
							</TextComponent>
						</View>

						<View
							className={`px-3 py-1.5 rounded-full ${
								isOpen ? 'bg-emerald-500' : 'bg-gray-400'
							}`}>
							<TextComponent className="text-white text-[10px] font-bold tracking-wide">
								{castingCall.status.toUpperCase()}
							</TextComponent>
						</View>
					</View>
				</View>

				{/* Stats */}
				<SectionCard>
					<View className="flex-row justify-between mb-4">
						<StatItem
							icon={
								<MapPin
									size={16}
									color="#4B5563"
								/>
							}
							label="Location"
							value={getLocationLabel(castingCall.location)}
						/>

						<StatItem
							icon={
								<Calendar
									size={16}
									color="#4B5563"
								/>
							}
							label="Deadline"
							value={formatDate(castingCall.deadline)}
						/>
					</View>

					<View className="flex-row justify-between">
						<StatItem
							icon={
								<Users
									size={16}
									color="#4B5563"
								/>
							}
							label="Applicants"
							value={castingCall.applicantCount}
						/>

						<StatItem
							icon={
								<Eye
									size={16}
									color="#4B5563"
								/>
							}
							label="Views"
							value={castingCall.viewCount}
						/>
					</View>
				</SectionCard>

				{/* Project Details */}
				<SectionCard>
					<SectionLabel>Project Details</SectionLabel>

					<View className="flex-row justify-between">
						<View>
							<TextComponent className="text-xs text-gray-500">
								Project Type
							</TextComponent>

							<TextComponent className="text-sm font-semibold text-gray-900">
								{PROJECT_TYPE_LABELS[castingCall.projectType]}
							</TextComponent>
						</View>

						<View>
							<TextComponent className="text-xs text-gray-500">
								Shortlisted
							</TextComponent>

							<TextComponent className="text-sm font-semibold text-gray-900">
								{castingCall.shortlistedCount}
							</TextComponent>
						</View>
					</View>
				</SectionCard>

				{/* Description */}
				<SectionCard>
					<SectionLabel>Description</SectionLabel>

					{isEditing ? (
						<TextInput
							value={editedDescription}
							onChangeText={setEditedDescription}
							multiline
							className="text-gray-800 text-[15px]"
							style={{ minHeight: 120, textAlignVertical: 'top' }}
						/>
					) : (
						<TextComponent className="text-gray-700 text-[15px] leading-7">
							{castingCall.description}
						</TextComponent>
					)}
				</SectionCard>

				{/* Director */}
				{createdBy && (
					<SectionCard>
						<SectionLabel>Casting Director</SectionLabel>

						<View className="flex-row items-center gap-x-3">
							<View className="h-12 w-12 rounded-full bg-[#9EDDD6] items-center justify-center">
								<TextComponent className="text-[#1a7a73] font-bold text-base">
									{createdBy.fullName?.charAt(0)}
								</TextComponent>
							</View>

							<View className="flex-1">
								<TextComponent className="text-sm font-semibold text-gray-900">
									{createdBy.fullName}
								</TextComponent>

								<TextComponent className="text-xs text-gray-500 mt-0.5">
									{createdBy.email}
								</TextComponent>
							</View>
						</View>
					</SectionCard>
				)}
			</ScrollView>

			{/* Action Bar */}
			{isDirector && (
				<View className="px-4 pb-6 pt-3 bg-white border-t border-gray-100">
					{isEditing ? (
						<View className="flex-row gap-x-3">
							<TouchableOpacity
								onPress={() => setIsEditing(false)}
								className="flex-1 py-3 rounded-xl border border-gray-200 items-center">
								<TextComponent className="text-gray-600 font-semibold text-sm">
									Cancel
								</TextComponent>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={handleSaveEdit}
								className="flex-1 py-3 rounded-xl bg-[#1a7a73] items-center">
								<TextComponent className="text-white font-semibold text-sm">
									{isUpdating ? 'Saving...' : 'Save Changes'}
								</TextComponent>
							</TouchableOpacity>
						</View>
					) : (
						<>
							<View className="flex-row gap-x-3 mb-3">
								<TouchableOpacity
									onPress={handleStartEdit}
									className="flex-1 py-3 rounded-xl border border-[#1a7a73] items-center">
									<TextComponent className="text-[#1a7a73] font-semibold text-sm">
										Edit
									</TextComponent>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => setIsCloseModalVisible(true)}
									className="flex-1 py-3 rounded-xl bg-amber-400 items-center">
									<TextComponent className="text-white font-semibold text-sm">
										Close Call
									</TextComponent>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								onPress={() => setIsDeleteModalVisible(true)}
								className="py-3 rounded-xl border border-red-200 items-center">
								<TextComponent className="text-red-600 font-semibold text-sm">
									Delete Casting Call
								</TextComponent>
							</TouchableOpacity>
						</>
					)}
				</View>
			)}

			{/* Modals */}
			<ConfirmActionModal
				visible={isCloseModalVisible}
				title="Close casting call"
				description="Are you sure you want to close this casting call?"
				confirmLabel="Close casting call"
				onConfirm={() => {
					closeCastingCall(castingCall._id);
					setIsCloseModalVisible(false);
				}}
				onClose={() => setIsCloseModalVisible(false)}
				isLoading={isClosing}
			/>

			<ConfirmActionModal
				visible={isDeleteModalVisible}
				title="Delete casting call"
				description="This action cannot be undone."
				confirmLabel="Delete"
				variant="danger"
				onConfirm={() => {
					deleteCastingCall(castingCall._id, {
						onSuccess: () => router.back(),
					});
					setIsDeleteModalVisible(false);
				}}
				onClose={() => setIsDeleteModalVisible(false)}
				isLoading={isDeleting}
			/>
		</SafeAreaView>
	);
}
