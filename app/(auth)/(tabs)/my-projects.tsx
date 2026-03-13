import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMyCastingCallsInfinite, useDeleteCastingCall } from '@/api/casting-call';
import ConfirmActionModal from '@/components/modals/ConfirmActionModal';
import TextComponent from '@/components/TextComponent';
import {
	formatDate,
	getLocationLabel,
	PROJECT_TYPE_LABELS,
} from '@/lib/castingCallUtils';
import { CastingCall, CastingCallStatus } from '@/types';
import { useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlashList } from '@shopify/flash-list';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import EmptyState from '@/components/projects/EmptyState';
import ProjectCard, {
	ProjectData,
} from '@/components/projects/ProjectCard';
import ProjectsHeader from '@/components/projects/ProjectsHeader';
import { ProjectStatus } from '@/components/projects/StatusBadge';
import PreviewCard from '@/components/create-casting-call/PreviewCard';

const Tab = createMaterialTopTabNavigator();

type FilterType = 'All' | ProjectStatus;

const mapStatusToProjectStatus = (
	status: CastingCallStatus,
): ProjectStatus => {
	switch (status) {
		case 'open':
			return 'Open';
		case 'draft':
			return 'Draft';
		case 'closed':
		case 'cancelled':
		case 'archived':
		default:
			return 'Closed';
	}
};

const mapCastingCallToProject = (call: CastingCall): ProjectData => ({
	id: call._id,
	title: call.title,
	status: mapStatusToProjectStatus(call.status),
	category: PROJECT_TYPE_LABELS[call.projectType] ?? 'Project',
	description: call.description,
	submissions: call.applicantCount,
	deadline: formatDate(call.deadline),
	location: getLocationLabel(call.location),
	tag: call.featured ? 'Featured' : undefined,
});

const ProjectListTab = ({ filter }: { filter: FilterType }) => {
	const router = useRouter();
	const toast = useToast();

	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isRefetching,
	} = useMyCastingCallsInfinite();

	const { mutate: deleteCastingCall, isPending: isDeleting } =
		useDeleteCastingCall();

	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

	const castingCalls = useMemo<CastingCall[]>(
		() => data?.pages.flatMap((page) => page.data.castingCalls) ?? [],
		[data],
	);

	const projects = useMemo<ProjectData[]>(
		() => castingCalls.map(mapCastingCallToProject),
		[castingCalls],
	);

	const filteredProjects = useMemo(() => {
		if (filter === 'All') return projects;
		return projects.filter((p) => p.status === filter);
	}, [filter, projects]);

	const handleView = useCallback(
		(id: string) => {
			router.push(`/casting-call/${id}`);
		},
		[router],
	);

	const handleEdit = handleView;

	const handleDeleteRequest = useCallback((id: string) => {
		setDeleteId(id);
		setIsDeleteModalVisible(true);
	}, []);

	const handleConfirmDelete = useCallback(() => {
		if (!deleteId) return;

		deleteCastingCall(deleteId, {
			onSuccess: () => {
				toast.show('Casting call deleted', { type: 'success' });
			},
			onError: () => {
				toast.show('Failed to delete casting call', { type: 'danger' });
			},
		});

		setIsDeleteModalVisible(false);
		setDeleteId(null);
	}, [deleteCastingCall, deleteId, toast]);

	const handleEndReached = useCallback(() => {
		if (isLoading || isFetchingNextPage || !hasNextPage) return;
		fetchNextPage();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

	const handleRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	const renderItem = useCallback(
		({ item }: { item: ProjectData }) => (
			<ProjectCard
				project={item}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDeleteRequest}
			/>
		),
		[handleView, handleEdit, handleDeleteRequest],
	);

	if (isLoading && !data) {
		return (
			<View className="flex-1 bg-[#AFEEEE] px-4 pt-4 items-center justify-center">
				<ActivityIndicator
					size="small"
					color="#4B5563"
				/>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-[#AFEEEE] px-4 pt-4">
			<FlashList
				data={filteredProjects}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					!isLoading && !isError ? (
						<EmptyState
							message={`No projects found for ${
								filter === 'All' ? 'All Projects' : filter
							}.`}
						/>
					) : null
				}
				ListFooterComponent={
					(isLoading || isFetchingNextPage) && hasNextPage ? (
						<View className="py-4">
							<ActivityIndicator
								size="small"
								color="#4B5563"
							/>
						</View>
					) : null
				}
				onEndReached={handleEndReached}
				onEndReachedThreshold={0.4}
				refreshing={isRefetching}
				onRefresh={handleRefresh}
				contentContainerStyle={{ paddingBottom: 20 }}
			/>

			<ConfirmActionModal
				visible={isDeleteModalVisible}
				title="Delete casting call"
				description="This action cannot be undone."
				confirmLabel="Delete"
				variant="danger"
				onConfirm={handleConfirmDelete}
				onClose={() => {
					setIsDeleteModalVisible(false);
					setDeleteId(null);
				}}
				isLoading={isDeleting}
			/>
		</View>
	);
};

type CastingCallFormData = {
	title: string;
	description: string;
	projectName: string;
	projectType: string;
	roleName: string;
	budgetAmount: string;
	budgetCurrency: string;
	budgetNegotiable: boolean;
	locationCity: string;
	locationState: string;
	deadline: string;
};

const DraftsTab = () => {
	const [draft, setDraft] = useState<CastingCallFormData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isClearModalVisible, setIsClearModalVisible] = useState(false);
	const toast = useToast();
	const router = useRouter();

	useEffect(() => {
		const loadDraft = async () => {
			try {
				const draftString = await AsyncStorage.getItem(
					'@draft_casting_call',
				);
				if (draftString) {
					const draftData = JSON.parse(draftString);
					setDraft(draftData);
				}
			} catch (error) {
				console.error('Failed to load draft:', error);
			} finally {
				setIsLoading(false);
			}
		};

		loadDraft();
	}, []);

	const handleContinueEditing = useCallback(() => {
		router.push('/(auth)/(tabs)/create-casting-call');
	}, [router]);

	const handleConfirmClearDraft = useCallback(() => {
		const clear = async () => {
			try {
				await AsyncStorage.removeItem('@draft_casting_call');
				setDraft(null);
				toast.show('Draft removed', { type: 'success' });
			} catch (error) {
				console.error('Failed to clear draft:', error);
				toast.show('Failed to clear draft', { type: 'danger' });
			} finally {
				setIsClearModalVisible(false);
			}
		};

		clear();
	}, [toast]);

	if (isLoading) {
		return (
			<View className="flex-1 bg-[#AFEEEE] px-4 pt-4 items-center justify-center">
				<ActivityIndicator
					size="small"
					color="#4B5563"
				/>
			</View>
		);
	}

	if (!draft) {
		return (
			<View className="flex-1 bg-[#AFEEEE] px-4 pt-4">
				<EmptyState message="No drafts saved on this device." />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-[#AFEEEE] px-4 pt-4">
			<View className="mb-4">
				<TextComponent className="text-base font-semibold text-gray-800 mb-1">
					Saved Draft
				</TextComponent>
				<TextComponent className="text-xs text-gray-600">
					This draft is saved locally on your device.
				</TextComponent>
			</View>

			<PreviewCard
				title={draft.title}
				location={`${draft.locationCity || ''}${
					draft.locationCity && draft.locationState ? ', ' : ''
				}${draft.locationState || ''}`}
				deadline={draft.deadline}
				description={draft.description}
			/>

			<View className="flex-row gap-x-3 mt-6">
				<TouchableOpacity
					onPress={handleContinueEditing}
					className="flex-1 py-3 rounded-xl bg-[#1a7a73] items-center">
					<TextComponent className="text-white font-semibold text-sm">
						Continue editing
					</TextComponent>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => setIsClearModalVisible(true)}
					className="flex-1 py-3 rounded-xl border border-red-200 items-center">
					<TextComponent className="text-red-600 font-semibold text-sm">
						Discard draft
					</TextComponent>
				</TouchableOpacity>
			</View>

			<ConfirmActionModal
				visible={isClearModalVisible}
				title="Discard draft"
				description="This will permanently remove your saved draft from this device."
				confirmLabel="Discard draft"
				variant="danger"
				onConfirm={handleConfirmClearDraft}
				onClose={() => setIsClearModalVisible(false)}
			/>
		</View>
	);
};

export default function MyProjectsScreen() {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: '#AFEEEE' }}
			edges={['top']}>
			<ProjectsHeader title="My Projects" />
			<KeyboardAvoidingView
				style={{ flex: 1, backgroundColor: '#AFEEEE' }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
				<Tab.Navigator
					screenOptions={{
						tabBarScrollEnabled: true,
						tabBarLabelStyle: {
							fontSize: 14,
							textTransform: 'none',
							fontWeight: '900',
							color: '#1f2937',
						},
						tabBarItemStyle: {
							width: 'auto',
							paddingHorizontal: 16,
						},
						tabBarIndicatorStyle: {
							backgroundColor: '#AFEEEE',
							height: 3,
							borderRadius: 3,
						},
						tabBarStyle: {
							elevation: 2,
							shadowOpacity: 0.1,
							borderRadius: 16,
							marginHorizontal: 16,
							marginVertical: 8,
							borderWidth: 1,
							borderColor: '#e5e7eb',
							overflow: 'hidden',
						},
						tabBarActiveTintColor: '#1f2937',
						tabBarInactiveTintColor: '#6b7280',
					}}>
					<Tab.Screen name="All Projects">
						{() => <ProjectListTab filter="All" />}
					</Tab.Screen>
					<Tab.Screen name="Open">
						{() => <ProjectListTab filter="Open" />}
					</Tab.Screen>
					<Tab.Screen name="Closed">
						{() => <ProjectListTab filter="Closed" />}
					</Tab.Screen>
					<Tab.Screen name="Drafts">
						{() => <DraftsTab />}
					</Tab.Screen>
				</Tab.Navigator>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
