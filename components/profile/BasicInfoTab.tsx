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
			firstName: '',
			lastName: '',
			aboutMe: '',
			careerHighlights: '',
			gender: '',
			dress: '',
			ageRange: '',
			email: '',
			phoneNumber: '',
			location: '',
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
					className="w-24 h-24 rounded-full mr-4 border-2 border-white"
				/>
				<TouchableOpacity className="bg-white flex-row items-center px-4 py-2 rounded-lg shadow-sm border border-gray-100">
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
							className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Enter first name"
							placeholderTextColor="#9ca3af"
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
							className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Enter last name"
							placeholderTextColor="#9ca3af"
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
							className="bg-white p-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base min-h-[120px]"
							multiline
							textAlignVertical="top"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							maxLength={500}
							placeholder="Tell us about yourself..."
							placeholderTextColor="#9ca3af"
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
							className="bg-white p-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base min-h-[120px]"
							multiline
							textAlignVertical="top"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							maxLength={1500}
							placeholder="Share your career highlights..."
							placeholderTextColor="#9ca3af"
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
							<View className="bg-white rounded-xl shadow-sm border border-gray-100 h-14 justify-center">
								{/* Mock Dropdown logic for now */}
								<TextInput
									className="px-4 text-gray-800 text-base h-full"
									value={value}
									onChangeText={onChange}
									placeholder="Select"
									placeholderTextColor="#9ca3af"
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
								className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								placeholder="Size"
								placeholderTextColor="#9ca3af"
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
							className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="e.g. 20-30"
							placeholderTextColor="#9ca3af"
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
							className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="email-address"
							placeholder="example@email.com"
							placeholderTextColor="#9ca3af"
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
						<View className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-14 justify-center">
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
								withDarkTheme
								containerStyle={{
									width: '100%',
									backgroundColor: 'white',
									height: '100%',
								}}
								textContainerStyle={{
									backgroundColor: 'white',
									paddingVertical: 0,
									height: '100%',
								}}
								textInputStyle={{
									color: '#1f2937',
									fontSize: 16,
									height: '100%',
									padding: 0,
								}}
								codeTextStyle={{
									color: '#6b7280',
									fontSize: 16,
									height: 22,
									lineHeight: 20,
								}}
								flagButtonStyle={{
									width: 50,
									justifyContent: 'center',
									alignItems: 'center',
									paddingLeft: 10,
								}}
								countryPickerButtonStyle={{
									width: 50,
								}}
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
							className="bg-white h-14 px-4 rounded-xl text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="City, State"
							placeholderTextColor="#9ca3af"
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
