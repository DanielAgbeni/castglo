import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../../components/projects/EmptyState';
import ProjectCard, { ProjectData } from '../../../components/projects/ProjectCard';
import ProjectsHeader from '../../../components/projects/ProjectsHeader';
import { ProjectStatus } from '../../../components/projects/StatusBadge';

const Tab = createMaterialTopTabNavigator();

// Dummy data representing the UI
const MOCK_PROJECTS: ProjectData[] = [
	{
		id: '1',
		title: 'Lead Role - Indie Drama',
		status: 'Open',
		category: 'Drama',
		description: 'Seeking passionate actor for lead role in upcoming indie drama about family relationships.',
		submissions: 24,
		deadline: '1/15/2024',
		location: 'Los Angeles, CA',
		tag: 'Public Voting',
	},
	{
		id: '2',
		title: 'Supporting Actor - Netflix Series',
		status: 'Closed',
		category: 'Thriller',
		description: 'Recurring supporting role in upcoming thriller series.',
		submissions: 18,
		deadline: '1/25/2024',
		location: 'Atlanta, GA',
		tag: 'Escrow Price',
	},
	{
		id: '3',
		title: 'Commercial - Tech Brand',
		status: 'Closed',
		category: 'Commercial',
		description: 'Looking for diverse talent for national tech commercial campaign.',
		submissions: 45,
		deadline: '1/10/2024',
		location: 'New York, NY',
		tag: 'Public Voting',
	},
	{
		id: '4',
		title: 'Voice Over - Animation',
		status: 'Draft',
		category: 'Animation',
		description: 'Character voice for animated feature film.',
		submissions: 0,
		deadline: '1/1/2024',
		location: 'Remote',
		tag: 'Public Voting',
	},
];

type FilterType = 'All' | ProjectStatus;

const ProjectListTab = ({ filter }: { filter: FilterType }) => {
	const filteredProjects = useMemo(() => {
		if (filter === 'All') return MOCK_PROJECTS;
		return MOCK_PROJECTS.filter((p) => p.status === filter);
	}, [filter]);

	const handleView = useCallback((id: string) => {
		console.log('View project', id);
	}, []);

	const handleEdit = useCallback((id: string) => {
		console.log('Edit project', id);
	}, []);

	const handleDelete = useCallback((id: string) => {
		console.log('Delete project', id);
	}, []);

	const renderItem = useCallback(
		({ item }: { item: ProjectData }) => (
			<ProjectCard
				project={item}
				onView={handleView}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		),
		[handleView, handleEdit, handleDelete]
	);

	return (
		<View className="flex-1 bg-[#AFEEEE] px-4 pt-4">
			<FlashList
				data={filteredProjects}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<EmptyState message={`No projects found for ${filter === 'All' ? 'All Projects' : filter}.`} />}
				contentContainerStyle={{ paddingBottom: 20 }}
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
						{() => <ProjectListTab filter="Draft" />}
					</Tab.Screen>
				</Tab.Navigator>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
