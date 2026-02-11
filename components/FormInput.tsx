import { Eye, EyeOff } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface FormInputProps {
	control: Control<any>;
	name: string;
	label?: string;
	placeholder?: string;
	secureTextEntry?: boolean;
	rules?: RegisterOptions;
	error?: string;
}

const FormInput = memo(
	({
		control,
		name,
		label,
		placeholder,
		secureTextEntry = false,
		rules,
		error,
	}: FormInputProps) => {
		const [isPasswordVisible, setIsPasswordVisible] =
			useState(!secureTextEntry);

		return (
			<View className="mb-4">
				{label && (
					<Text className="text-black font-semibold mb-2 ml-1 text-base">
						{label}
					</Text>
				)}
				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field: { onChange, onBlur, value } }) => (
						<View className="flex-row items-center border border-gray-300 rounded-xl bg-white px-4">
							<TextInput
								className="flex-1 py-4 text-base text-black"
								placeholder={placeholder}
								placeholderTextColor="#9CA3AF"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								secureTextEntry={!isPasswordVisible}
								autoCapitalize="none"
							/>
							{secureTextEntry && (
								<TouchableOpacity
									onPress={() => setIsPasswordVisible(!isPasswordVisible)}
									className="p-2">
									{isPasswordVisible ? (
										<Eye
											size={20}
											color="#6B7280"
										/>
									) : (
										<EyeOff
											size={20}
											color="#6B7280"
										/>
									)}
								</TouchableOpacity>
							)}
						</View>
					)}
				/>
				{error && (
					<Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>
				)}
			</View>
		);
	},
);

export default FormInput;
