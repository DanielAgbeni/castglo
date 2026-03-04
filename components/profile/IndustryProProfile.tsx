import { Upload } from 'lucide-react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native';
import FormInput from '../FormInput';
import TextComponent from '../TextComponent';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function IndustryProProfile() {
	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			firstName: 'Daniel',
			lastName: 'Agbeni',
			profession: 'Photographer',
			bio: '',
			servicesOffered: '',
			hourlyRate: '',
			sessionRate: '',
			startTime: '',
			endTime: '',
		},
	});

	const [selectedDays, setSelectedDays] = useState<Set<string>>(new Set());

	const toggleDay = (day: string) => {
		const newSelected = new Set(selectedDays);
		if (newSelected.has(day)) {
			newSelected.delete(day);
		} else {
			newSelected.add(day);
		}
		setSelectedDays(newSelected);
	};

	const onSubmit = (data: any) => {
		console.log('Profile Data:', { ...data, selectedDays: Array.from(selectedDays) });
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={{ flex: 1 }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 20 }}>
					
					{/* Profile Photo Section */}
					<View className="flex-row items-center mb-8 bg-transparent">
						<View className="relative mr-4">
							<Image
								source={{ uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop' }}
								className="w-[70px] h-[70px] rounded-full border border-gray-200"
							/>
						</View>
						<View>
							<TouchableOpacity className="flex-row items-center bg-white border border-gray-300 rounded-lg px-4 py-2 self-start mb-2 shadow-sm">
								<Upload size={16} color="#374151" className="mr-2" />
								<TextComponent className="text-gray-800 font-semibold text-sm">
									Upload Photo
								</TextComponent>
							</TouchableOpacity>
							<TextComponent className="text-gray-500 text-xs">
								JPG, PNG or GIF. Max size 5MB.
							</TextComponent>
						</View>
					</View>

					{/* Basic Information */}
					<View className="mb-8">
						<TextComponent className="text-gray-900 font-bold text-lg mb-1">
							Basic Information
						</TextComponent>
						<TextComponent className="text-gray-600 text-sm mb-4">
							Your professional details and contact information
						</TextComponent>

						<FormInput
							control={control}
							name="firstName"
							label="First Name"
							placeholder="First Name"
						/>
						<FormInput
							control={control}
							name="lastName"
							label="Last Name"
							placeholder="Last Name"
						/>
						<FormInput
							control={control}
							name="profession"
							label="Profession"
							placeholder="Profession"
						/>
						<FormInput
							control={control}
							name="bio"
							label="Bio"
							placeholder="Bio"
						/>
					</View>

					{/* Portfolio Samples */}
					<View className="mb-8">
						<TextComponent className="text-gray-900 font-bold text-lg mb-1">
							Portfolio Samples
						</TextComponent>
						<TextComponent className="text-gray-600 text-sm mb-4">
							Showcase your best work to attract clients
						</TextComponent>
						
						<View className="flex-row flex-wrap gap-3">
							<Image
								source={{ uri: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80' }}
								className="w-[47%] h-32 rounded-xl"
							/>
							<Image
								source={{ uri: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=500&q=80' }}
								className="w-[47%] h-32 rounded-xl"
							/>
							<Image
								source={{ uri: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80' }}
								className="w-[47%] h-32 rounded-xl"
							/>
							<TouchableOpacity className="w-[47%] h-32 rounded-xl bg-white border-2 border-dashed border-gray-300 items-center justify-center">
								<Upload size={24} color="#374151" className="mb-2" />
								<TextComponent className="text-gray-600 text-xs">Add Image</TextComponent>
							</TouchableOpacity>
						</View>
					</View>

					{/* Services & Rates */}
					<View className="mb-8">
						<TextComponent className="text-gray-900 font-bold text-lg mb-1">
							Services & Rates
						</TextComponent>
						<TextComponent className="text-gray-600 text-sm mb-4">
							List your services and pricing information
						</TextComponent>

						<FormInput
							control={control}
							name="servicesOffered"
							label="Services Offered"
							placeholder="e.g. Photography, Styling"
						/>
						<FormInput
							control={control}
							name="hourlyRate"
							label="Hourly Rate"
							placeholder="$"
						/>
						<FormInput
							control={control}
							name="sessionRate"
							label="Session Rate"
							placeholder="$"
						/>
					</View>

					{/* Availability */}
					<View className="mb-8">
						<TextComponent className="text-gray-900 font-bold text-lg mb-1">
							Availability
						</TextComponent>
						<TextComponent className="text-gray-600 text-sm mb-4">
							Set your working hours and availability
						</TextComponent>

						<TextComponent className="text-gray-800 font-semibold text-sm mb-2">Working Days</TextComponent>
						<View className="flex-row flex-wrap gap-2 mb-4">
							{DAYS.map((day) => (
								<TouchableOpacity
									key={day}
									onPress={() => toggleDay(day)}
									className={`px-3 py-1.5 rounded-md border ${
										selectedDays.has(day)
											? 'bg-indigo-50 border-indigo-200'
											: 'bg-white border-gray-200'
									}`}>
									<TextComponent
										className={`text-sm ${
											selectedDays.has(day) ? 'text-[#5B4DFF]' : 'text-gray-600'
										}`}>
										{day}
									</TextComponent>
								</TouchableOpacity>
							))}
						</View>

						<FormInput
							control={control}
							name="startTime"
							label="Start Time"
							placeholder="e.g. 9:00 AM"
						/>
						<FormInput
							control={control}
							name="endTime"
							label="End Time"
							placeholder="e.g. 5:00 PM"
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>

			{/* Sticky Footer */}
			<View className="absolute bottom-6 left-0 right-0 px-4 flex-row justify-end space-x-3 gap-x-3">
				<TouchableOpacity className="px-6 py-3 rounded-lg bg-white border border-gray-200 shadow-sm active:opacity-80">
					<TextComponent className="text-gray-800 font-bold text-base">
						Cancel
					</TextComponent>
				</TouchableOpacity>
				<TouchableOpacity 
					className="px-6 py-3 rounded-lg bg-[#5B4DFF] shadow-sm active:opacity-80"
					onPress={handleSubmit(onSubmit)}>
					<TextComponent className="text-white font-bold text-base">
						Save Profile
					</TextComponent>
				</TouchableOpacity>
			</View>
		</View>
	);
}
