import { Plus, X } from 'lucide-react-native';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

type SkillLevel = 'Beginner' | 'Intermediate' | 'Expert';

interface Skill {
	name: string;
	level: SkillLevel;
}

interface SkillsFormData {
	skills: Skill[];
}

const LEVEL_OPTIONS: SkillLevel[] = ['Beginner', 'Intermediate', 'Expert'];

const SkillsTab = () => {
	const { control, handleSubmit } = useForm<SkillsFormData>({
		defaultValues: {
			skills: [
				{ name: 'Improvisation', level: 'Expert' },
				{ name: 'Voice Acting', level: 'Intermediate' },
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'skills',
	});

	const onSubmit = (data: SkillsFormData) => {
		console.log('Skills Data:', data);
		// TODO: Implement save logic
	};

	const getLevelColor = (level: SkillLevel, isSelected: boolean) => {
		if (!isSelected) return 'bg-gray-100 text-gray-500';
		switch (level) {
			case 'Beginner':
				return 'bg-blue-100 text-blue-700 border-blue-200';
			case 'Intermediate':
				return 'bg-purple-100 text-purple-700 border-purple-200';
			case 'Expert':
				return 'bg-green-100 text-green-700 border-green-200';
			default:
				return 'bg-gray-100 text-gray-500';
		}
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<ScrollView
				className="flex-1 px-4 py-6"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}>
				<TextComponent className="text-xl font-bold text-gray-900 mb-1">
					Skills & Attributes
				</TextComponent>
				<TextComponent className="text-sm text-gray-600 mb-6">
					Add your acting skills and expertise levels
				</TextComponent>

				{/* Add Skill Button */}
				<TouchableOpacity
					onPress={() => append({ name: '', level: 'Beginner' })}
					className="flex-row items-center justify-center bg-white py-4 rounded-xl shadow-sm border border-gray-100 mb-6 active:opacity-80">
					<View className="bg-black/5 p-1 rounded-full mr-2">
						<Plus
							size={20}
							color="#000"
						/>
					</View>
					<TextComponent className="font-semibold text-gray-800 text-base">
						Add a Custom Skill
					</TextComponent>
				</TouchableOpacity>

				{/* Skills List */}
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

							{/* Skill Name Input */}
							<View className="mb-4 pr-8">
								<TextComponent className="text-gray-900 font-bold mb-2 text-base">
									Skill Name
								</TextComponent>
								<Controller
									control={control}
									name={`skills.${index}.name`}
									rules={{ required: true }}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className="bg-gray-50 h-12 px-5 rounded-lg text-gray-700 text-base border border-gray-200 focus:border-gray-400 focus:bg-white"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											placeholder="e.g. Stage Combat"
											placeholderTextColor="#9ca3af"
										/>
									)}
								/>
							</View>

							{/* Level Selection */}
							<View>
								<TextComponent className="text-gray-500 text-xs font-semibold mb-3 uppercase tracking-wider">
									Proficiency Level
								</TextComponent>
								<Controller
									control={control}
									name={`skills.${index}.level`}
									render={({ field: { onChange, value } }) => (
										<View className="flex-row flex-wrap gap-2">
											{LEVEL_OPTIONS.map((option) => {
												const isSelected = value === option;
												return (
													<TouchableOpacity
														key={option}
														onPress={() => onChange(option)}
														className={`px-4 py-2 rounded-full border ${
															isSelected
																? getLevelColor(option, true).split(' ')[0] +
																	' ' +
																	getLevelColor(option, true).split(' ')[2]
																: 'border-transparent bg-gray-50'
														}`}>
														<TextComponent
															className={`text-sm font-medium ${
																isSelected
																	? getLevelColor(option, true).split(' ')[1]
																	: 'text-gray-500'
															}`}>
															{option}
														</TextComponent>
													</TouchableOpacity>
												);
											})}
										</View>
									)}
								/>
							</View>
						</View>
					))}
				</View>

				{fields.length === 0 && (
					<View className="items-center justify-center py-10 opacity-50">
						<TextComponent className="text-gray-500 text-center">
							No skills added yet.{'\n'}Tap the button above to start showcasing
							your talent!
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

export default SkillsTab;
