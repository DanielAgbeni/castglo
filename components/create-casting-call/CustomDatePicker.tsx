import { Calendar } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import TextComponent from '../TextComponent';

interface CustomDatePickerProps {
	control: Control<any>;
	name: string;
	label: string;
	placeholder: string;
	error?: string;
}

const CustomDatePicker = memo(({
	control,
	name,
	label,
	placeholder,
	error,
}: CustomDatePickerProps) => {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const formatDate = (date: Date) => {
		if (!date) return '';
		const d = new Date(date);
		return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`;
	};

	return (
		<View className="mb-5">
			<TextComponent className="text-gray-800 font-bold mb-2 ml-1 text-sm tracking-wide">
				{label}
			</TextComponent>

			<Controller
				control={control}
				name={name}
				rules={{ required: `${label} is required` }}
				render={({ field: { onChange, value } }) => (
					<>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={showDatePicker}
							className={`border ${
								error ? 'border-red-500' : 'border-gray-200'
							} rounded-2xl bg-white px-4 h-14 flex-row items-center shadow-sm`}
						>
							<TextComponent
								className={`flex-1 text-base ${
									value ? 'text-gray-900' : 'text-gray-400'
								}`}
							>
								{value ? formatDate(new Date(value)) : placeholder}
							</TextComponent>
							<Calendar size={20} color="#6B7280" />
						</TouchableOpacity>

						{error && (
							<TextComponent className="text-red-500 text-sm mt-1.5 ml-1">
								{error}
							</TextComponent>
						)}

						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							date={value ? new Date(value) : new Date()}
							onConfirm={(date) => {
								onChange(date.toISOString());
								hideDatePicker();
							}}
							onCancel={hideDatePicker}
							minimumDate={new Date()}
						/>
					</>
				)}
			/>
		</View>
	);
});

CustomDatePicker.displayName = 'CustomDatePicker';

export default CustomDatePicker;
