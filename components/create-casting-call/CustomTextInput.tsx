import { ChevronDown } from 'lucide-react-native';
import React, { memo } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { TextInput, TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface CustomTextInputProps {
	control: Control<any>;
	name: string;
	label: string;
	placeholder: string;
	multiline?: boolean;
	isSelect?: boolean;
	onPressSelect?: () => void;
	rules?: RegisterOptions;
	error?: string;
	keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
	value?: string;
}

const CustomTextInput = memo(({ 
	control,
	name,
	label, 
	placeholder, 
	multiline = false,
	isSelect = false,
	onPressSelect,
	rules,
	error,
	keyboardType = 'default',
	value: valueOverride
}: CustomTextInputProps) => {
	return (
		<View className="mb-5">
			<TextComponent className="text-gray-800 font-bold mb-2 ml-1 text-sm tracking-wide">
				{label}
			</TextComponent>
			
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<>
						<TouchableOpacity 
							activeOpacity={isSelect ? 0.7 : 1}
							onPress={isSelect ? onPressSelect : undefined}
							className={`border ${error ? 'border-red-500' : 'border-gray-200'} rounded-2xl bg-white px-4 ${multiline ? 'py-3' : 'py-0 h-14'} flex-row items-center shadow-sm`}
						>
							<TextInput
								className={`flex-1 text-base text-gray-900 ${multiline ? 'h-32' : ''}`}
								placeholder={placeholder}
								placeholderTextColor="#9CA3AF"
								multiline={multiline}
								textAlignVertical={multiline ? 'top' : 'center'}
								value={valueOverride !== undefined ? valueOverride : value}
								onBlur={onBlur}
								onChangeText={onChange}
								editable={!isSelect}
								pointerEvents={isSelect ? 'none' : 'auto'}
								keyboardType={keyboardType}
							/>
							{isSelect && <ChevronDown size={20} color="#6B7280" />}
						</TouchableOpacity>
						{error && (
							<TextComponent className="text-red-500 text-sm mt-1.5 ml-1">{error}</TextComponent>
						)}
					</>
				)}
			/>
		</View>
	);
});

CustomTextInput.displayName = 'CustomTextInput';
export default CustomTextInput;
