import { Bug } from 'lucide-react-native';
import React, { memo, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import TextComponent from '../components/TextComponent';
import { useAppStore } from '../store';
import { UserRole } from '../types';
import ModalLayout from './ModalLayout';

const ROLES: { label: string; value: UserRole }[] = [
	{ label: '🎭 Talent', value: 'talent' },
	{ label: '🎬 Casting Director', value: 'casting_director' },
	{ label: '🏢 Industry Pro', value: 'industry_professional' },
];

function DevRoleSwitcher() {
	const [open, setOpen] = useState(false);
	const activeRole = useAppStore((s) => s.getActiveRole());
	const devRoleOverride = useAppStore((s) => s.devRoleOverride);
	const setDevRoleOverride = useAppStore((s) => s.setDevRoleOverride);

	if (!__DEV__) return null;

	const pick = (role: UserRole) => {
		setDevRoleOverride(role === useAppStore.getState().user?.role ? null : role);
		setOpen(false);
	};

	return (
		<>
			<TouchableOpacity
				className="absolute bottom-20 right-4 w-12 h-12 rounded-full bg-indigo-600 items-center justify-center z-50 shadow-lg"
				onPress={() => setOpen(true)}
				activeOpacity={0.8}>
				<Bug color="#fff" size={20} />
			</TouchableOpacity>

			<ModalLayout
				visible={open}
				transparent
				animationType="fade"
				onClose={() => setOpen(false)}>
				<Pressable
					className="flex-1 bg-black/40 justify-end"
					onPress={() => setOpen(false)}>
					<View className="bg-white rounded-t-2xl px-6 pt-6 pb-10">
						<TextComponent className="text-lg font-bold text-gray-900 mb-1">
							Switch Role
						</TextComponent>
						{devRoleOverride && (
							<TextComponent size="small" className="text-indigo-600 mb-4">
								Override active: {devRoleOverride}
							</TextComponent>
						)}
						{ROLES.map(({ label, value }) => {
							const isActive = value === activeRole;
							return (
								<TouchableOpacity
									key={value}
									className={`py-3.5 px-4 rounded-xl mt-2 ${
										isActive
											? 'bg-indigo-50 border border-indigo-600'
											: 'bg-gray-100'
									}`}
									onPress={() => pick(value)}
									activeOpacity={0.7}>
									<TextComponent
										className={`text-base ${
											isActive
												? 'text-indigo-600 font-semibold'
												: 'text-gray-700'
										}`}>
										{label}
									</TextComponent>
								</TouchableOpacity>
							);
						})}
						{devRoleOverride && (
							<TouchableOpacity
								className="mt-4 items-center"
								onPress={() => {
									setDevRoleOverride(null);
									setOpen(false);
								}}>
								<TextComponent className="text-red-500 text-sm font-semibold">
									Clear Override
								</TextComponent>
							</TouchableOpacity>
						)}
					</View>
				</Pressable>
			</ModalLayout>
		</>
	);
}

export default memo(DevRoleSwitcher);
