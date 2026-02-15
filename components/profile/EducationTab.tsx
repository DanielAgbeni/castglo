import { Plus, X } from 'lucide-react-native';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface EducationEntry {
	school: string;
	degree: string;
	instructor: string;
	location: string;
	year: string;
}

interface EducationFormData {
	education: EducationEntry[];
}

const EducationTab = () => {
	const { control, handleSubmit } = useForm<EducationFormData>({
		defaultValues: {
			education: [
				{
					school: 'New York Film Academy',
					degree: 'Acting for Film',
					instructor: '',
					location: 'New York, NY',
					year: '2020',
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'education',
	});

	const onSubmit = (data: EducationFormData) => {
		console.log('Education Data:', data);
		// TODO: Implement save logic
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<ScrollView
				className="flex-1 px-4 py-6"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}>
				<TextComponent className="text-xl font-bold text-gray-900 mb-1">
					Education
				</TextComponent>
				<TextComponent className="text-sm text-gray-600 mb-6">
					Add your acting training and education
				</TextComponent>

				{/* Add Education Button */}
				<TouchableOpacity
					onPress={() =>
						append({
							school: '',
							degree: '',
							instructor: '',
							location: '',
							year: '',
						})
					}
					className="flex-row items-center justify-center bg-white py-4 rounded-xl shadow-sm border border-gray-100 mb-6 active:opacity-80">
					<View className="bg-black/5 p-1 rounded-full mr-2">
						<Plus
							size={20}
							color="#000"
						/>
					</View>
					<TextComponent className="font-semibold text-gray-800 text-base">
						Add Education Entry
					</TextComponent>
				</TouchableOpacity>

				{/* Education List */}
				<View className="gap-y-4">
					{fields.map((field, index) => (
						<View
							key={field.id}
							className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative">
							{/* Remove Button */}
							<TouchableOpacity
								onPress={() => remove(index)}
								className="absolute top-4 right-4 p-1 rounded-full bg-gray-50 active:bg-red-50 z-10">
								<X
									size={18}
									className="text-gray-400"
								/>
							</TouchableOpacity>

							<TextComponent className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">
								Entry #{index + 1}
							</TextComponent>

							{/* School */}
							<View className="mb-4">
								<TextComponent className="text-gray-900 font-bold mb-2 text-base">
									School *
								</TextComponent>
								<Controller
									control={control}
									name={`education.${index}.school`}
									rules={{ required: true }}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											placeholder="e.g. Juilliard School"
											placeholderTextColor="#9ca3af"
										/>
									)}
								/>
							</View>

							{/* Degree/Course */}
							<View className="mb-4">
								<TextComponent className="text-gray-900 font-bold mb-2 text-base">
									Degree/Course *
								</TextComponent>
								<Controller
									control={control}
									name={`education.${index}.degree`}
									rules={{ required: true }}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											placeholder="e.g. Bachelor of Fine Arts"
											placeholderTextColor="#9ca3af"
										/>
									)}
								/>
							</View>

							{/* Instructor */}
							<View className="mb-4">
								<TextComponent className="text-gray-900 font-bold mb-2 text-base">
									Instructor
								</TextComponent>
								<Controller
									control={control}
									name={`education.${index}.instructor`}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											placeholder="Optional"
											placeholderTextColor="#9ca3af"
										/>
									)}
								/>
							</View>

							{/* Location & Year Row */}
							<View className="flex-row gap-x-4">
								<View className="flex-1">
									<TextComponent className="text-gray-900 font-bold mb-2 text-base">
										Location
									</TextComponent>
									<Controller
										control={control}
										name={`education.${index}.location`}
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												placeholder="City, State"
												placeholderTextColor="#9ca3af"
											/>
										)}
									/>
								</View>
								<View className="w-1/3">
									<TextComponent className="text-gray-900 font-bold mb-2 text-base">
										Year
									</TextComponent>
									<Controller
										control={control}
										name={`education.${index}.year`}
										render={({ field: { onChange, onBlur, value } }) => (
											<TextInput
												className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
												onBlur={onBlur}
												onChangeText={onChange}
												value={value}
												keyboardType="numeric"
												placeholder="2023"
												placeholderTextColor="#9ca3af"
											/>
										)}
									/>
								</View>
							</View>
						</View>
					))}
				</View>

				{fields.length === 0 && (
					<View className="items-center justify-center py-10 opacity-50">
						<TextComponent className="text-gray-500 text-center">
							No education added yet.{'\n'}Add your training history to stand
							out.
						</TextComponent>
					</View>
				)}
			</ScrollView>

			{/* Sticky Save Button */}
			<View className="absolute bottom-6 left-4 right-4">
				<TouchableOpacity
					className="bg-[#5B4DFF] py-4 rounded-xl items-center shadow-lg shadow-indigo-200 active:opacity-90"
					onPress={handleSubmit(onSubmit)}>
					<TextComponent className="text-white font-bold text-lg">
						Save Changes
					</TextComponent>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default EducationTab;
