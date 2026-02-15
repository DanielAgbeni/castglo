import { Upload } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

const BasicInfoTab = () => {
	const { control, handleSubmit, watch } = useForm({
		defaultValues: {
			firstName: 'Jordan',
			lastName: 'Davis',
			aboutMe:
				'Passionate actor with 5+ years of experience in theater and film.',
			careerHighlights:
				'Award-winning performer. Featured in multiple independent films and theater productions.',
			gender: 'Male',
			dress: 'M',
			ageRange: '',
			email: 'jordan.davis@gmail.com',
			phoneNumber: '',
			location: 'Los Angeles, CA',
		},
	});

	const [formattedValue, setFormattedValue] = useState('');
	const phoneInput = useRef<PhoneInput>(null);
	const aboutMeLength = watch('aboutMe')?.length || 0;
	const careerHighlightsLength = watch('careerHighlights')?.length || 0;

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<ScrollView
			className="flex-1 bg-[#AFEEEE] px-4 py-6"
			showsVerticalScrollIndicator={false}>
			<Text className="text-lg font-bold text-gray-900 mb-1">
				Basic Information
			</Text>
			<Text className="text-sm text-gray-600 mb-6">
				Update your personal and contact information
			</Text>

			{/* Photo Section */}
			<View className="flex-row items-center mb-6">
				<Image
					source={{ uri: 'https://i.pravatar.cc/150?img=32' }} // Placeholder image
					className="w-16 h-16 rounded-full mr-4 border-2 border-white"
				/>
				<TouchableOpacity className="bg-white flex-row items-center px-4 py-2 rounded-lg shadow-sm">
					<Upload
						size={20}
						color="black"
						className="mr-2"
					/>
					<Text className="font-semibold text-gray-800">Upload Photo</Text>
				</TouchableOpacity>
			</View>

			{/* Form Fields */}

			{/* First Name */}
			<View className="mb-4">
				<Text className="text-gray-800 font-semibold mb-2">First Name</Text>
				<Controller
					control={control}
					name="firstName"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
			</View>

			{/* Last Name */}
			<View className="mb-4">
				<Text className="text-gray-800 font-semibold mb-2">Last Name</Text>
				<Controller
					control={control}
					name="lastName"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
			</View>

			{/* About Me */}
			<View className="mb-4">
				<View className="flex-row justify-between mb-2">
					<Text className="text-gray-800 font-semibold">About Me</Text>
					<Text className="text-gray-500 text-xs">({aboutMeLength}/500)</Text>
				</View>
				<Controller
					control={control}
					name="aboutMe"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm min-h-[100px]"
							multiline
							textAlignVertical="top"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							maxLength={500}
						/>
					)}
				/>
			</View>

			{/* Career Highlights */}
			<View className="mb-4">
				<View className="flex-row justify-between mb-2">
					<Text className="text-gray-800 font-semibold">Career Highlights</Text>
					<Text className="text-gray-500 text-xs">
						({careerHighlightsLength}/1500)
					</Text>
				</View>
				<Controller
					control={control}
					name="careerHighlights"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm min-h-[100px]"
							multiline
							textAlignVertical="top"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							maxLength={1500}
						/>
					)}
				/>
			</View>

			{/* Gender & Dress */}
			<View className="flex-row justify-between mb-4">
				<View className="flex-1 mr-2">
					<Text className="text-gray-800 font-semibold mb-2">Gender</Text>
					<Controller
						control={control}
						name="gender"
						render={({ field: { onChange, value } }) => (
							<View className="bg-white rounded-lg shadow-sm">
								{/* Mock Dropdown logic for now, utilizing TextInput or simple View as placeholder for select */}
								<TextInput
									className="p-3 text-gray-800"
									value={value}
									onChangeText={onChange}
								/>
							</View>
						)}
					/>
				</View>
				<View className="flex-1 ml-2">
					<Text className="text-gray-800 font-semibold mb-2">Dress</Text>
					<Controller
						control={control}
						name="dress"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
				</View>
			</View>

			{/* Age Range */}
			<View className="mb-4">
				<Text className="text-gray-800 font-semibold mb-2">Age Range</Text>
				<Controller
					control={control}
					name="ageRange"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
			</View>

			{/* Email */}
			<View className="mb-4">
				<Text className="text-gray-800 font-semibold mb-2">Email</Text>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="email-address"
						/>
					)}
				/>
			</View>

			{/* Phone */}
			<View className="mb-4">
				<Text className="text-gray-800 font-semibold mb-2">Phone</Text>
				<Controller
					control={control}
					name="phoneNumber"
					render={({ field: { onChange, value } }) => (
						<View className="bg-white rounded-lg shadow-sm overflow-hidden">
							<PhoneInput
								ref={phoneInput}
								defaultValue={value}
								defaultCode="NG"
								layout="first"
								onChangeText={(text) => {
									onChange(text);
								}}
								onChangeFormattedText={(text) => {
									setFormattedValue(text);
								}}
								containerStyle={{ width: '100%', backgroundColor: 'white' }}
								textContainerStyle={{ backgroundColor: 'white' }}
								textInputStyle={{ color: '#1f2937', height: 50 }}
								codeTextStyle={{ color: '#6b7280' }}
								flagButtonStyle={{ backgroundColor: 'white' }}
							/>
						</View>
					)}
				/>
			</View>

			{/* Location */}
			<View className="mb-6">
				<Text className="text-gray-800 font-semibold mb-2">Location</Text>
				<Controller
					control={control}
					name="location"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white p-3 rounded-lg text-gray-800 shadow-sm"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
			</View>

			{/* Save Button */}
			<View className="mb-10">
				<TouchableOpacity
					className="bg-black py-4 rounded-full items-center active:opacity-80"
					onPress={handleSubmit(onSubmit)}>
					<Text className="text-white font-bold text-lg">Save Changes</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default BasicInfoTab;
