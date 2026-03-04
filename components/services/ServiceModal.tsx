import ModalLayout from '@/components/ModalLayout';
import TextComponent from '@/components/TextComponent';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, View } from 'react-native';

export interface ServiceFormData {
	title: string;
	description: string;
	price: string;
	duration: string;
}

interface ServiceModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (data: ServiceFormData) => void;
	initialData?: ServiceFormData | null;
}

export default function ServiceModal({ visible, onClose, onSave, initialData }: ServiceModalProps) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [duration, setDuration] = useState('');

	const isEditing = !!initialData;

	useEffect(() => {
		if (visible) {
			if (initialData) {
				setTitle(initialData.title);
				setDescription(initialData.description);
				setPrice(initialData.price);
				setDuration(initialData.duration);
			} else {
				setTitle('');
				setDescription('');
				setPrice('');
				setDuration('');
			}
		}
	}, [visible, initialData]);

	const handleSave = () => {
		onSave({ title, description, price, duration });
		onClose();
	};

	return (
		<ModalLayout
			visible={visible}
			transparent
			animationType="fade"
			onClose={onClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1">
				<View className="flex-1 justify-center items-center bg-black/40 px-4">
					<View className="bg-[#AFEEEE] w-full max-w-sm rounded-2xl p-5 shadow-xl border border-teal-200">
						<TextComponent className="text-xl font-bold text-black mb-1">
							Create New Service
						</TextComponent>
						<TextComponent className="text-gray-700 text-sm mb-5">
							{isEditing
								? 'Update your service details and pricing'
								: 'Add a new service to your offerings'}
						</TextComponent>

						{/* Service Title */}
						<View className="mb-4">
							<TextComponent className="text-black font-semibold mb-1.5">
								Service Title
							</TextComponent>
							<TextInput
								value={title}
								onChangeText={setTitle}
								placeholder="e.g., Professional Headshot Session"
								placeholderTextColor="#8ebfb8"
								className="border border-teal-300 rounded-lg px-3 py-2.5 text-black bg-white/30"
							/>
						</View>

						{/* Description */}
						<View className="mb-4">
							<TextComponent className="text-black font-semibold mb-1.5">
								Description
							</TextComponent>
							<TextInput
								value={description}
								onChangeText={setDescription}
								placeholder="Describe your service in detail..."
								placeholderTextColor="#8ebfb8"
								multiline
								textAlignVertical="top"
								className="border border-teal-300 rounded-lg px-3 py-2.5 h-24 text-black bg-white/30"
							/>
						</View>

						{/* Price and Duration Row */}
						<View className="flex-row gap-x-4 mb-6">
							<View className="flex-1">
								<TextComponent className="text-black font-semibold mb-1.5">
									Price
								</TextComponent>
								<TextInput
									value={price}
									onChangeText={setPrice}
									placeholder="250"
									placeholderTextColor="#8ebfb8"
									keyboardType="numeric"
									className="border border-teal-300 rounded-lg px-3 py-2.5 text-black bg-white/30"
								/>
							</View>
							<View className="flex-1">
								<TextComponent className="text-black font-semibold mb-1.5">
									Duration
								</TextComponent>
								<TextInput
									value={duration}
									onChangeText={setDuration}
									placeholder="e.g., 2 hours"
									placeholderTextColor="#8ebfb8"
									className="border border-teal-300 rounded-lg px-3 py-2.5 text-black bg-white/30"
								/>
							</View>
						</View>

						{/* Action Buttons */}
						<View className="flex-row justify-end items-center gap-x-3">
							<TouchableOpacity
								onPress={onClose}
								className="border border-teal-400 px-5 py-2.5 rounded-lg bg-[#AFEEEE]">
								<TextComponent className="text-black font-bold">Cancel</TextComponent>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={handleSave}
								className="bg-[#5a4ddb] px-5 py-2.5 rounded-lg shadow-sm">
								<TextComponent className="text-white font-bold">
									{isEditing ? 'Save Changes' : 'Create Service'}
								</TextComponent>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>
		</ModalLayout>
	);
}
