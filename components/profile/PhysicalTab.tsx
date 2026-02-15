import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import TextComponent from '../TextComponent';

type UnitSystem = 'imperial' | 'metric';

interface PhysicalFormData {
	heightFeet: string;
	heightInches: string;
	heightCm: string;
	weightLbs: string;
	weightKg: string;
	eyeColor: string;
	hairColor: string;
	bodyType: string;
	chestBust: string;
	waist: string;
	hip: string;
}

const PhysicalTab = () => {
	const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');

	const { control, handleSubmit, watch, setValue } = useForm<PhysicalFormData>({
		defaultValues: {
			heightFeet: '',
			heightInches: '',
			heightCm: '',
			weightLbs: '',
			weightKg: '',
			eyeColor: '',
			hairColor: '',
			bodyType: '',
			chestBust: '',
			waist: '',
			hip: '',
		},
	});

	const onSubmit = (data: PhysicalFormData) => {
		console.log('Physical Attributes:', data, 'Unit System:', unitSystem);
		// Validate and save logic here
	};

	const TabButton = ({
		title,
		active,
		onPress,
	}: {
		title: string;
		active: boolean;
		onPress: () => void;
	}) => (
		<TouchableOpacity
			onPress={onPress}
			className={`flex-1 py-3 items-center justify-center rounded-lg ${
				active ? 'bg-[#5B4DFF]' : 'bg-[#AFEEEE]'
			} mx-1`}>
			<Text
				className={`font-semibold ${active ? 'text-white' : 'text-gray-800'}`}>
				{title}
			</Text>
		</TouchableOpacity>
	);

	return (
		<ScrollView
			className="flex-1 bg-[#AFEEEE] px-4 py-6"
			showsVerticalScrollIndicator={false}>
			<Text className="text-lg font-bold text-gray-900 mb-1">
				Physical Attributes
			</Text>
			<Text className="text-sm text-gray-600 mb-6">
				Provide physical details for casting considerations
			</Text>

			{/* Unit Switcher */}
			<View className="flex-col mb-6 space-y-2">
				<TouchableOpacity
					onPress={() => setUnitSystem('imperial')}
					className={`py-3 px-6 rounded-lg items-center mb-2 ${
						unitSystem === 'imperial' ? 'bg-[#5B4DFF]' : 'bg-[#9aecec]'
					}`}>
					<TextComponent
						className={`font-semibold ${
							unitSystem === 'imperial' ? 'text-white' : 'text-gray-800'
						}`}>
						Imperial (ft/in, lbs)
					</TextComponent>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setUnitSystem('metric')}
					className={`py-3 px-6 rounded-lg items-center ${
						unitSystem === 'metric' ? 'bg-[#5B4DFF]' : 'bg-[#9aecec]'
					}`}>
					<TextComponent
						className={`font-semibold ${
							unitSystem === 'metric' ? 'text-white' : 'text-gray-800'
						}`}>
						Metric (cm, kg)
					</TextComponent>
				</TouchableOpacity>
			</View>

			{/* Height Section */}
			<View className="flex-row mb-4 justify-between">
				{unitSystem === 'imperial' ? (
					<>
						<View className="flex-1 mr-2">
							<TextComponent className="text-gray-800 font-semibold mb-2">
								Height(ft)
							</TextComponent>
							<Controller
								control={control}
								name="heightFeet"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										keyboardType="numeric"
										placeholder="5"
										placeholderTextColor="#9ca3af"
									/>
								)}
							/>
						</View>
						<View className="flex-1 mr-2">
							<TextComponent className="text-gray-800 font-semibold mb-2">
								Height(in)
							</TextComponent>
							<Controller
								control={control}
								name="heightInches"
								render={({ field: { onChange, onBlur, value } }) => (
									<TextInput
										className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										keyboardType="numeric"
										placeholder="8"
										placeholderTextColor="#9ca3af"
									/>
								)}
							/>
						</View>
					</>
				) : (
					<View className="flex-1">
						<TextComponent className="text-gray-800 font-semibold mb-2">
							Height(cm)
						</TextComponent>
						<Controller
							control={control}
							name="heightCm"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									keyboardType="numeric"
									placeholder="173"
									placeholderTextColor="#9ca3af"
								/>
							)}
						/>
					</View>
				)}
			</View>

			{/* Weight Section */}
			<View className="flex-row mb-4 justify-between">
				{unitSystem === 'imperial' ? (
					<View className="flex-1">
						<TextComponent className="text-gray-800 font-semibold mb-2">
							Weight(lbs)
						</TextComponent>
						<Controller
							control={control}
							name="weightLbs"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									keyboardType="numeric"
									placeholder="150"
									placeholderTextColor="#9ca3af"
								/>
							)}
						/>
					</View>
				) : (
					<View className="flex-1">
						<TextComponent className="text-gray-800 font-semibold mb-2">
							Weight(kg)
						</TextComponent>
						<Controller
							control={control}
							name="weightKg"
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									keyboardType="numeric"
									placeholder="68"
									placeholderTextColor="#9ca3af"
								/>
							)}
						/>
					</View>
				)}
			</View>

			{/* Eye & Hair Color */}
			<View className="flex-row mb-4 justify-between">
				<View className="flex-1 mr-2">
					<TextComponent className="text-gray-800 font-semibold mb-2">
						Eye Color
					</TextComponent>
					<Controller
						control={control}
						name="eyeColor"
						render={({ field: { onChange, value } }) => (
							<View className="bg-white rounded-lg shadow-sm border border-gray-100 h-12 justify-center">
								<View className="flex-row items-center justify-between px-4">
									<TextInput
										className="text-gray-800 text-base flex-1"
										value={value}
										onChangeText={onChange}
										placeholder="Brown"
										placeholderTextColor="#9ca3af"
									/>
									<ChevronDown
										size={20}
										color="#9ca3af"
									/>
								</View>
							</View>
						)}
					/>
				</View>
				<View className="flex-1 ml-2">
					<TextComponent className="text-gray-800 font-semibold mb-2">
						Hair Color
					</TextComponent>
					<Controller
						control={control}
						name="hairColor"
						render={({ field: { onChange, value } }) => (
							<View className="bg-white rounded-lg shadow-sm border border-gray-100 h-12 justify-center">
								<View className="flex-row items-center justify-between px-4">
									<TextInput
										className="text-gray-800 text-base flex-1"
										value={value}
										onChangeText={onChange}
										placeholder="Brown"
										placeholderTextColor="#9ca3af"
									/>
									<ChevronDown
										size={20}
										color="#9ca3af"
									/>
								</View>
							</View>
						)}
					/>
				</View>
			</View>

			{/* Body Type */}
			<View className="mb-4">
				<TextComponent className="text-gray-800 font-semibold mb-2">
					Body Type
				</TextComponent>
				<Controller
					control={control}
					name="bodyType"
					render={({ field: { onChange, value } }) => (
						<View className="bg-white rounded-lg shadow-sm border border-gray-100 h-12 justify-center w-1/2">
							<View className="flex-row items-center justify-between px-4">
								<TextInput
									className="text-gray-800 text-base flex-1"
									value={value}
									onChangeText={onChange}
									placeholder="Athletic"
									placeholderTextColor="#9ca3af"
								/>
								<ChevronDown
									size={20}
									color="#9ca3af"
								/>
							</View>
						</View>
					)}
				/>
			</View>

			{/* Measurements */}
			<View className="flex-row mb-4 justify-between">
				<View className="flex-1 mr-2">
					<TextComponent className="text-gray-800 font-semibold mb-2">
						Chest/Bust({unitSystem === 'imperial' ? 'in' : 'cm'})
					</TextComponent>
					<Controller
						control={control}
						name="chestBust"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								keyboardType="numeric"
								placeholder="38"
								placeholderTextColor="#9ca3af"
							/>
						)}
					/>
				</View>
				<View className="flex-1 ml-2">
					<TextComponent className="text-gray-800 font-semibold mb-2">
						Waist({unitSystem === 'imperial' ? 'in' : 'cm'})
					</TextComponent>
					<Controller
						control={control}
						name="waist"
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								keyboardType="numeric"
								placeholder="32"
								placeholderTextColor="#9ca3af"
							/>
						)}
					/>
				</View>
			</View>

			<View className="mb-8 w-1/2 pr-2">
				<TextComponent className="text-gray-800 font-semibold mb-2">
					Hip({unitSystem === 'imperial' ? 'in' : 'cm'})
				</TextComponent>
				<Controller
					control={control}
					name="hip"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className="bg-white h-12 px-4 rounded-lg text-gray-800 shadow-sm border border-gray-100 text-base"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="numeric"
							placeholder="36"
							placeholderTextColor="#9ca3af"
						/>
					)}
				/>
			</View>

			{/* Save Button */}
			<View className="mb-10 items-center">
				<TouchableOpacity
					className="bg-[#5B4DFF] py-3 px-8 rounded-lg active:opacity-80"
					onPress={handleSubmit(onSubmit)}>
					<Text className="text-white font-semibold text-lg">Save Changes</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default PhysicalTab;
