import {
	Camera,
	ChevronDown,
	Mail,
	MapPin,
	Phone,
	User,
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import TextComponent from '../TextComponent';

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
		console.log('Basic Info Data:', data);
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<ScrollView
				className="flex-1 px-4 py-6"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}>
				<TextComponent className="text-xl font-bold text-gray-900 mb-1">
					Basic Information
				</TextComponent>
				<TextComponent className="text-sm text-gray-600 mb-6">
					Update your personal and contact information
				</TextComponent>

				{/* Profile Photo Section */}
				<View className="items-center mb-8">
					<View className="relative">
						<Image
							source={{ uri: 'https://i.pravatar.cc/300?img=32' }}
							className="w-32 h-32 rounded-full border-4 border-white shadow-sm"
						/>
						<TouchableOpacity className="absolute bottom-0 right-0 bg-[#5B4DFF] p-2.5 rounded-full border-[3px] border-[#AFEEEE] shadow-sm active:opacity-80">
							<Camera
								size={18}
								className="text-white"
							/>
						</TouchableOpacity>
					</View>
					<TextComponent className="mt-3 text-gray-900 font-bold text-lg">
						Daniel Agbeni
					</TextComponent>
					<TextComponent className="text-gray-500 text-sm font-medium">
						Actor • Model • Voice Artist
					</TextComponent>
				</View>

				{/* Personal Details Card */}
				<View className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
					<View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
						<User
							size={18}
							className="text-gray-400 mr-2"
						/>
						<TextComponent className="text-gray-900 font-bold text-base">
							Personal Details
						</TextComponent>
					</View>

					<View className="flex-row gap-x-4 mb-4">
						<View className="flex-1">
							<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
								First Name
							</TextComponent>
							<Controller
								control={control}
								name="firstName"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										className="bg-gray-50 h-12 px-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										placeholder="First Name"
										placeholderTextColor="#9ca3af"
									/>
								)}
							/>
						</View>
						<View className="flex-1">
							<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
								Last Name
							</TextComponent>
							<Controller
								control={control}
								name="lastName"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										className="bg-gray-50 h-12 px-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										placeholder="Last Name"
										placeholderTextColor="#9ca3af"
									/>
								)}
							/>
						</View>
					</View>

					<View className="flex-row gap-x-4 mb-4">
						<View className="flex-1">
							<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
								Gender
							</TextComponent>
							<Controller
								control={control}
								name="gender"
								render={({ field: { onChange, value } }) => (
									<View className="bg-gray-50 h-12 px-4 rounded-lg border border-gray-200 flex-row items-center justify-between">
										<TextInput
											className="flex-1 text-gray-800 text-base"
											value={value}
											onChangeText={onChange}
											placeholder="Select"
											placeholderTextColor="#9ca3af"
										/>
										<ChevronDown
											size={16}
											className="text-gray-400"
										/>
									</View>
								)}
							/>
						</View>
						<View className="flex-1">
							<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
								Age Range
							</TextComponent>
							<Controller
								control={control}
								name="ageRange"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										className="bg-gray-50 h-12 px-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										placeholder="e.g. 20-30"
										placeholderTextColor="#9ca3af"
									/>
								)}
							/>
						</View>
					</View>

					<View className="mb-4">
						<View className="flex-row justify-between mb-2">
							<TextComponent className="text-gray-700 font-semibold text-sm">
								About Me
							</TextComponent>
							<TextComponent className="text-gray-400 text-xs">
								{aboutMeLength}/500
							</TextComponent>
						</View>
						<Controller
							control={control}
							name="aboutMe"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									className="bg-gray-50 p-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white min-h-[100px]"
									multiline
									textAlignVertical="top"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									maxLength={500}
									placeholder="Tell casting directors a bit about yourself..."
									placeholderTextColor="#9ca3af"
								/>
							)}
						/>
					</View>

					<View>
						<View className="flex-row justify-between mb-2">
							<TextComponent className="text-gray-700 font-semibold text-sm">
								Career Highlights
							</TextComponent>
							<TextComponent className="text-gray-400 text-xs">
								{careerHighlightsLength}/1500
							</TextComponent>
						</View>
						<Controller
							control={control}
							name="careerHighlights"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									className="bg-gray-50 p-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white min-h-[100px]"
									multiline
									textAlignVertical="top"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									maxLength={1500}
									placeholder="List your key roles, awards, or achievements..."
									placeholderTextColor="#9ca3af"
								/>
							)}
						/>
					</View>
				</View>

				{/* Contact Info Card */}
				<View className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
					<View className="flex-row items-center mb-4 border-b border-gray-100 pb-2">
						<Phone
							size={18}
							className="text-gray-400 mr-2"
						/>
						<TextComponent className="text-gray-900 font-bold text-base">
							Contact Information
						</TextComponent>
					</View>

					<View className="mb-4">
						<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
							Email Address
						</TextComponent>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, onBlur, value } }) => (
								<View className="relative">
									<View className="absolute left-4 top-3.5 z-10">
										<Mail
											size={18}
											className="text-gray-400"
										/>
									</View>
									<TextInput
										className="bg-gray-50 h-12 pl-12 pr-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										keyboardType="email-address"
										placeholder="example@email.com"
										placeholderTextColor="#9ca3af"
									/>
								</View>
							)}
						/>
					</View>

					<View className="mb-4">
						<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
							Phone Number
						</TextComponent>
						<Controller
							control={control}
							name="phoneNumber"
							render={({ field: { onChange, value } }) => (
								<View className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden h-12 justify-center">
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
											backgroundColor: 'transparent',
											height: '100%',
										}}
										textContainerStyle={{
											backgroundColor: 'transparent',
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

					<View>
						<TextComponent className="text-gray-700 font-semibold mb-2 text-sm">
							Location
						</TextComponent>
						<Controller
							control={control}
							name="location"
							render={({ field: { onChange, onBlur, value } }) => (
								<View className="relative">
									<View className="absolute left-4 top-3.5 z-10">
										<MapPin
											size={18}
											className="text-gray-400"
										/>
									</View>
									<TextInput
										className="bg-gray-50 h-12 pl-12 pr-4 rounded-lg text-gray-800 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										placeholder="City, State"
										placeholderTextColor="#9ca3af"
									/>
								</View>
							)}
						/>
					</View>
				</View>
			</ScrollView>

			{/* Sticky Save Button */}
			<View className="absolute bottom-6 left-4 right-4">
				<TouchableOpacity
					className="bg-black py-4 rounded-xl items-center shadow-lg shadow-gray-400 active:opacity-90"
					onPress={handleSubmit(onSubmit)}>
					<TextComponent className="text-white font-bold text-lg">
						Save Changes
					</TextComponent>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default BasicInfoTab;
