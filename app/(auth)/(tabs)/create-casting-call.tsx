import { FileText, Sparkles } from 'lucide-react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCreateCastingCall } from '@/api/casting-call';
import ActionButtons from '@/components/create-casting-call/ActionButtons';
import CustomDatePicker from '@/components/create-casting-call/CustomDatePicker';
import CustomTextInput from '@/components/create-casting-call/CustomTextInput';
import FormToggle from '@/components/create-casting-call/FormToggle';
import OptionSelectModal from '@/components/modals/OptionSelectModal';
import PreviewCard from '@/components/create-casting-call/PreviewCard';
import SectionHeader from '@/components/create-casting-call/SectionHeader';
import TextComponent from '@/components/TextComponent';

const PROJECT_TYPE_OPTIONS = [
	{ label: 'Feature Film', value: 'feature_film' },
	{ label: 'Short Film', value: 'short_film' },
	{ label: 'Commercial', value: 'commercial' },
	{ label: 'Music Video', value: 'music_video' },
	{ label: 'Television', value: 'television' },
	{ label: 'Theater', value: 'theater' },
	{ label: 'Web Series', value: 'web_series' },
	{ label: 'Voice Over', value: 'voice_over' },
	{ label: 'Other', value: 'other' },
];

const CURRENCY_OPTIONS = [
	{ label: 'USD - US Dollar', value: 'USD' },
	{ label: 'NGN - Nigerian Naira', value: 'NGN' },
	{ label: 'GBP - British Pound', value: 'GBP' },
	{ label: 'EUR - Euro', value: 'EUR' },
];

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

export default function CreateCastingCallScreen() {
	const toast = useToast();
	const { mutate: createCall, isPending } = useCreateCastingCall();

	const { control, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<CastingCallFormData>({
		defaultValues: {
			title: '',
			description: '',
			projectName: '',
			projectType: 'other',
			roleName: '',
			budgetAmount: '',
			budgetCurrency: 'USD',
			budgetNegotiable: false,
			locationCity: '',
			locationState: '',
			deadline: '',
		}
	});

	const [isDraftLoading, setIsDraftLoading] = useState(true);
	const [isProjectTypeModalVisible, setProjectTypeModalVisible] = useState(false);
	const [isCurrencyModalVisible, setCurrencyModalVisible] = useState(false);

	const formValues = watch();

	useEffect(() => {
		const loadDraft = async () => {
			try {
				const draftString = await AsyncStorage.getItem('@draft_casting_call');
				if (draftString) {
					const draftData = JSON.parse(draftString);
					reset(draftData);
					toast.show('Draft loaded successfully', { type: 'success' });
				}
			} catch (error) {
				console.error('Failed to load draft:', error);
			} finally {
				setIsDraftLoading(false);
			}
		};
		loadDraft();
	}, [reset, toast]);

	const handleCreate = useCallback((data: CastingCallFormData) => {
		const payload = {
			title: data.title,
			description: data.description,
			projectName: data.projectName,
			projectType: data.projectType,
			status: 'open',
			roles: [{ name: data.roleName }],
			budget: { 
				amount: Number(data.budgetAmount) || 0, 
				currency: data.budgetCurrency, 
				isNegotiable: data.budgetNegotiable 
			},
			location: { city: data.locationCity, state: data.locationState },
			deadline: new Date(data.deadline).toISOString(),
			media: []
		};

		createCall(payload as any, {
			onSuccess: () => {
				toast.show('Casting call created successfully', { type: 'success' });
				reset();
			},
			onError: (error) => {
				toast.show('Failed to create casting call', { type: 'danger' });
				console.error(error);
			}
		});
	}, [createCall, toast, reset]);

	const handleSaveDraft = useCallback(async () => {
		try {
			await AsyncStorage.setItem('@draft_casting_call', JSON.stringify(formValues));
			toast.show('Draft saved to device', { type: 'success' });
		} catch (error) {
			console.error('Failed to save draft:', error);
			toast.show('Failed to save draft', { type: 'danger' });
		}
	}, [formValues, toast]);

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
						name="projectName"
						label="Project Name *"
						placeholder="e.g., The Silent Witness"
						rules={{ required: 'Project Name is required' }}
						error={errors.projectName?.message}
					/>

					<CustomTextInput
						control={control}
						name="projectType"
						label="Project Type *"
						placeholder="Select project type"
						rules={{ required: 'Project Type is required' }}
						error={errors.projectType?.message}
						isSelect
						onPressSelect={() => setProjectTypeModalVisible(true)}
						value={PROJECT_TYPE_OPTIONS.find(o => o.value === formValues.projectType)?.label || ''}
					/>

					<View className="h-4" />
					<SectionHeader 
						title="Role Details" 
						subtitle="Who are you looking for?" 
					/>

					<CustomTextInput
						control={control}
						name="roleName"
						label="Role Name *"
						placeholder="e.g., Voice Over Artist"
						rules={{ required: 'Role Name is required' }}
						error={errors.roleName?.message}
					/>

					<View className="h-4" />
					<SectionHeader 
						title="Location & Budget" 
						subtitle="Where and how much?" 
					/>

					<View className="flex-row gap-x-4">
						<View className="flex-1">
							<CustomTextInput
								control={control}
								name="locationCity"
								label="City *"
								placeholder="e.g., Remote"
								rules={{ required: 'City is required' }}
								error={errors.locationCity?.message}
							/>
						</View>
						<View className="flex-1">
							<CustomTextInput
								control={control}
								name="locationState"
								label="State *"
								placeholder="e.g., N/A"
								rules={{ required: 'State is required' }}
								error={errors.locationState?.message}
							/>
						</View>
					</View>

					<View className="flex-row gap-x-4">
						<View className="flex-[2]">
							<CustomTextInput
								control={control}
								name="budgetAmount"
								label="Budget Amount *"
								placeholder="e.g., 3000"
								rules={{ required: 'Budget is required' }}
								error={errors.budgetAmount?.message}
								keyboardType="numeric"
							/>
						</View>
						<View className="flex-1">
							<CustomTextInput
								control={control}
								name="budgetCurrency"
								label="Currency *"
								placeholder="USD"
								rules={{ required: 'Required' }}
								error={errors.budgetCurrency?.message}
								isSelect
								onPressSelect={() => setCurrencyModalVisible(true)}
								value={formValues.budgetCurrency}
							/>
						</View>
					</View>

					<FormToggle
						control={control}
						name="budgetNegotiable"
						title="Budget Negotiable"
						description="Can this budget be negotiated?"
					/>

					<View className="h-4" />
					<SectionHeader 
						title="Timeline" 
						subtitle="When does it happen?" 
					/>

					<CustomDatePicker
						control={control}
						name="deadline"
						label="Application Deadline *"
						placeholder="Select Date"
						error={errors.deadline?.message}
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
						location={`${formValues.locationCity || ''}${formValues.locationCity && formValues.locationState ? ', ' : ''}${formValues.locationState || ''}`}
						deadline={formValues.deadline}
						description={formValues.description}
					/>

					<ActionButtons
						onCreate={handleSubmit(handleCreate)}
						onSaveDraft={handleSaveDraft}
						isPending={isPending}
					/>
				</ScrollView>

				<OptionSelectModal
					isVisible={isProjectTypeModalVisible}
					onClose={() => setProjectTypeModalVisible(false)}
					onSelect={(val) => setValue('projectType', val)}
					options={PROJECT_TYPE_OPTIONS}
					title="Select Project Type"
					selectedValue={formValues.projectType}
				/>

				<OptionSelectModal
					isVisible={isCurrencyModalVisible}
					onClose={() => setCurrencyModalVisible(false)}
					onSelect={(val) => setValue('budgetCurrency', val)}
					options={CURRENCY_OPTIONS}
					title="Select Currency"
					selectedValue={formValues.budgetCurrency}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
