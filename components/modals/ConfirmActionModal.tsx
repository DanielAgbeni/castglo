import ModalLayout from '@/components/ModalLayout';
import TextComponent from '@/components/TextComponent';
import { X } from 'lucide-react-native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface ConfirmActionModalProps {
	visible: boolean;
	title: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm: () => void;
	onClose: () => void;
	variant?: 'default' | 'danger';
	isLoading?: boolean;
}

export default function ConfirmActionModal({
	visible,
	title,
	description,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	onConfirm,
	onClose,
	variant = 'default',
	isLoading,
}: ConfirmActionModalProps) {
	const isDanger = variant === 'danger';
	const confirmBg = isDanger ? '#DC2626' : '#4F46E5';

	return (
		<ModalLayout
			visible={visible}
			transparent
			animationType="fade"
			onClose={onClose}>
			<View className="flex-1 justify-center items-center bg-black/40 px-4">
				<View className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl">
					<View className="flex-row justify-between items-start mb-2">
						<TextComponent className="text-lg font-bold text-gray-900">
							{title}
						</TextComponent>
						<TouchableOpacity
							onPress={onClose}
							className="p-1 -mr-1 -mt-1">
							<X
								size={20}
								color="#4B5563"
							/>
						</TouchableOpacity>
					</View>

					{description ? (
						<TextComponent className="text-sm text-gray-600 mb-6 leading-5">
							{description}
						</TextComponent>
					) : null}

					<View className="flex-row gap-x-3">
						<TouchableOpacity
							onPress={onClose}
							disabled={isLoading}
							className="flex-1 py-3 rounded-xl border border-gray-300 items-center">
							<TextComponent className="text-gray-700 font-semibold">
								{cancelLabel}
							</TextComponent>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onConfirm}
							disabled={isLoading}
							style={{ backgroundColor: confirmBg }}
							className="flex-1 py-3 rounded-xl items-center">
							<TextComponent className="text-white font-semibold">
								{isLoading ? 'Please wait...' : confirmLabel}
							</TextComponent>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ModalLayout>
	);
}

