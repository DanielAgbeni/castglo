import { FileText, Sparkles } from 'lucide-react-native';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ActionButtons from '@/components/create-casting-call/ActionButtons';
import CustomTextInput from '@/components/create-casting-call/CustomTextInput';
import FormToggle from '@/components/create-casting-call/FormToggle';
import PreviewCard from '@/components/create-casting-call/PreviewCard';
import SectionHeader from '@/components/create-casting-call/SectionHeader';
import TextComponent from '@/components/TextComponent';

type CastingCallFormData = {
	title: string;
	description: string;
	requirements: string;
	genre: string;
	location: string;
	deadline: string;
	enablePublicVoting: boolean;
	escrowPrize: boolean;
};

export default function CreateCastingCallScreen() {
	const { control, handleSubmit, watch, formState: { errors } } = useForm<CastingCallFormData>({
		defaultValues: {
			title: '',
			description: '',
			requirements: '',
			genre: '',
			location: '',
			deadline: '',
			enablePublicVoting: false,
			escrowPrize: false,
		}
	});

	const formValues = watch();

	const handleCreate = useCallback((data: CastingCallFormData) => {
		console.log('Create casting call:', data);
	}, []);

	const handleSaveDraft = useCallback(() => {
		console.log('Save as draft');
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-[#AFEEEE]" edges={['top']}>
			<KeyboardAvoidingView 
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				className="flex-1"
			>
				<View className="px-6 py-5 flex-row justify-between items-center bg-[#AFEEEE]">
					<View className="flex-row items-center">
						<FileText size={26} color="#111827" strokeWidth={2.5} />
						<TextComponent className="text-2xl font-black text-gray-900 ml-3 tracking-tight">
							Create Casting Call
						</TextComponent>
					</View>
				</View>

				<ScrollView 
					className="flex-1"
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
				>
					<SectionHeader 
						title="Basic Information" 
						subtitle="Provide the essential details for your casting call" 
					/>

					<CustomTextInput
						control={control}
						name="title"
						label="Title *"
						placeholder="e.g., Lead Role - Indie Drama"
						rules={{ required: 'Title is required' }}
						error={errors.title?.message}
					/>

					<CustomTextInput
						control={control}
						name="description"
						label="Description *"
						placeholder="Describe the role, project and what you're looking for in talent..."
						rules={{ required: 'Description is required' }}
						error={errors.description?.message}
						multiline
					/>

					<CustomTextInput
						control={control}
						name="requirements"
						label="Requirements"
						placeholder="Specific skills, experience, or attributes required"
						multiline
					/>

					<CustomTextInput
						control={control}
						name="genre"
						label="Genre *"
						placeholder="Select genre"
						rules={{ required: 'Genre is required' }}
						error={errors.genre?.message}
						isSelect
						onPressSelect={() => {}} 
					/>

					<CustomTextInput
						control={control}
						name="location"
						label="Location *"
						placeholder="e.g., Los Angeles, CA or Remote"
						rules={{ required: 'Location is required' }}
						error={errors.location?.message}
					/>

					<CustomTextInput
						control={control}
						name="deadline"
						label="Application Deadline *"
						placeholder="DD/MM/YY"
						rules={{ required: 'Deadline is required' }}
						error={errors.deadline?.message}
					/>

					<View className="h-6" />

					<SectionHeader 
						title="Advanced Options" 
						subtitle="Configure additional features for your casting call" 
					/>

					<FormToggle
						control={control}
						name="enablePublicVoting"
						title="Enable Public Voting"
						description="Allow the public to vote on submissions to help with selection"
					/>

					<FormToggle
						control={control}
						name="escrowPrize"
						title="Escrow Prize"
						description="Set up an escrow prize that will be automatically awarded to the selected talent"
					/>

					<View className="h-6" />

					<View className="flex-row items-center mb-1 mt-6">
						<Sparkles size={20} color="#4F46E5" />
						<TextComponent className="text-lg font-bold text-gray-900 ml-2">
							Preview
						</TextComponent>
					</View>
					<TextComponent className="text-sm text-gray-700 leading-5 mb-5">
						How your casting call will appear to talent
					</TextComponent>

					<PreviewCard
						title={formValues.title}
						location={formValues.location}
						deadline={formValues.deadline}
						description={formValues.description}
					/>

					<ActionButtons
						onCreate={handleSubmit(handleCreate)}
						onSaveDraft={handleSaveDraft}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
