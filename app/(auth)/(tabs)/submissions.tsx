import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProjectsHeader from '../../../components/projects/ProjectsHeader';
import AuditionPreviewModal from '../../../components/submissions/AuditionPreviewModal';
import AwardRoleModal from '../../../components/submissions/AwardRoleModal';
import SubmissionCard, { SubmissionData } from '../../../components/submissions/SubmissionCard';

const MOCK_SUBMISSIONS: SubmissionData[] = [
	{
		id: '1',
		talentInitials: 'SJ',
		talentName: 'Sarah Johnson',
		location: 'Los Angeles, CA',
		role: 'Lead Role - Indie Drama',
		submittedDate: '1/12/2024',
		experience: '5+ years',
		notes: 'Strong emotional range, perfect for the character arc.',
		status: 'pending',
	},
	{
		id: '2',
		talentInitials: 'MC',
		talentName: 'Michael Chen',
		location: 'New York, NY',
		role: 'Supporting Actor - Netflix Series',
		submittedDate: '1/11/2024',
		experience: '8+ years',
		notes: 'Excellent screen presence and chemistry with lead actors.',
		status: 'approved',
	},
	{
		id: '3',
		talentInitials: 'DK',
		talentName: 'David Kim',
		location: 'Atlanta, GA',
		role: 'Commercial - Tech Brand',
		submittedDate: '1/9/2024',
		experience: '6+ years',
		notes: 'Good performance but not quite the right fit for this particular role.',
		status: 'rejected',
	},
];

export default function SubmissionsScreen() {
	const [submissions, setSubmissions] = useState<SubmissionData[]>(MOCK_SUBMISSIONS);
	const [selectedPreview, setSelectedPreview] = useState<SubmissionData | null>(null);
	const [selectedAward, setSelectedAward] = useState<SubmissionData | null>(null);

	const handlePreview = useCallback(
		(id: string) => {
			const sub = submissions.find((s) => s.id === id);
			if (sub) setSelectedPreview(sub);
		},
		[submissions]
	);

	const handleApprove = useCallback((id: string) => {
		setSubmissions((prev) =>
			prev.map((s) => (s.id === id ? { ...s, status: 'approved' } : s))
		);
	}, []);

	const handleReject = useCallback((id: string) => {
		setSubmissions((prev) =>
			prev.map((s) => (s.id === id ? { ...s, status: 'rejected' } : s))
		);
	}, []);

	const handleAward = useCallback(
		(id: string) => {
			const sub = submissions.find((s) => s.id === id);
			if (sub) setSelectedAward(sub);
		},
		[submissions]
	);

	const handleConfirmAward = useCallback(() => {
		setSelectedAward(null);
	}, []);

	const renderItem = useCallback(
		({ item }: { item: SubmissionData }) => (
			<SubmissionCard
				submission={item}
				onPreview={handlePreview}
				onApprove={handleApprove}
				onReject={handleReject}
				onAward={handleAward}
			/>
		),
		[handlePreview, handleApprove, handleReject, handleAward]
	);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#AFEEEE' }} edges={['top']}>
			<ProjectsHeader title="Submissions" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
			>
				<View className="flex-1 px-4 pt-4">
					<FlashList
						data={submissions}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				</View>

				{/* Modals */}
				<AuditionPreviewModal
					visible={!!selectedPreview}
					submission={selectedPreview}
					onClose={() => setSelectedPreview(null)}
				/>

				<AwardRoleModal
					visible={!!selectedAward}
					submission={selectedAward}
					onClose={() => setSelectedAward(null)}
					onConfirm={handleConfirmAward}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
