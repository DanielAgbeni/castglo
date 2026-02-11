import { Link, useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Welcome() {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const roles = [
		{
			id: 'talent',
			title: 'Talent',
			description: 'Actor, Singer, Dancer, or Performer',
			icon: require('../../assets/icons/talent.png'),
			color: 'bg-blue-500', // Approximate color from image
		},
		{
			id: 'casting',
			title: 'Casting Director',
			description: 'Find and manage talent',
			icon: require('../../assets/icons/casting.png'),
			color: 'bg-pink-500',
		},
		{
			id: 'industry',
			title: 'Industry Professional',
			description: 'Agent, Manager, or Scout',
			icon: require('../../assets/icons/industry.png'),
			color: 'bg-orange-500',
		},
	];

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<View
				style={{
					paddingTop: insets.top + 20,
				}}
				className="flex-1 justify-between">
				{/* Header */}
				<View className="px-6 mb-4">
					<Text className="text-3xl font-bold text-center text-black mb-2">
						Join Castglo
					</Text>
					<Text className="text-gray-700 text-center text-base">
						Choose your role to get started
					</Text>
				</View>

				{/* Role Cards */}
				<View className="flex-1 px-6 justify-center gap-y-7">
					{roles.map((role) => (
						<TouchableOpacity
							key={role.id}
							className="bg-white rounded-2xl p-6 flex-row items-center space-x-6 shadow-sm"
							onPress={() =>
								router.push({
									pathname: '/(public)/signup',
									params: { role: role.title },
								})
							}>
							<View
								className={`w-16 h-16 rounded-xl items-center justify-center`}>
								<Image
									source={role.icon}
									className="w-16 h-16"
									resizeMode="contain"
								/>
							</View>
							<View className="flex-1">
								<Text className="text-lg font-bold text-black">
									{role.title}
								</Text>
								<Text className="text-gray-600 text-sm">
									{role.description}
								</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>

				{/* Footer */}
				<View
					className="bg-white pt-6 items-center border-t border-gray-100"
					style={{ paddingBottom: insets.bottom + 24 }}>
					<View className="flex-row items-center">
						<Text className="text-gray-600 text-base">
							Already have an account?{' '}
						</Text>
						<Link href="/(public)/login">
							<Text className="text-[#5443DB] font-bold text-base">Log in</Text>
						</Link>
					</View>
				</View>
			</View>
		</View>
	);
}
