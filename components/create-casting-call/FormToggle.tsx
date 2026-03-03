import React, { memo } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Switch, View } from 'react-native';
import TextComponent from '../TextComponent';

interface FormToggleProps {
	control: Control<any>;
	name: string;
	title: string;
	description: string;
}

const FormToggle = memo(({ control, name, title, description }: FormToggleProps) => {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (
				<View className="flex-row items-center justify-between mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
					<View className="flex-1 pr-4">
						<TextComponent className="text-base font-bold text-gray-900 mb-1">
							{title}
						</TextComponent>
						<TextComponent className="text-sm text-gray-500 leading-5">
							{description}
						</TextComponent>
					</View>
					<Switch
						value={value}
						onValueChange={onChange}
						trackColor={{ false: '#E5E7EB', true: '#4F46E5' }}
						thumbColor="#FFFFFF"
						ios_backgroundColor="#E5E7EB"
					/>
				</View>
			)}
		/>
	);
});

FormToggle.displayName = 'FormToggle';
export default FormToggle;
