import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore } from '../../store';

const { width } = Dimensions.get('window');

const onboardingData = [
	{
		id: 1,
		image: require('../../assets/images/onboard1.png'),
		title: 'Discover Amazing Talent',
		description:
			'Browse hundreds of talented performers and find the perfect fit for your project',
	},
	{
		id: 2,
		image: require('../../assets/images/onboard2.png'),
		title: 'Showcase Your Skills',
		description:
			'Create your portfolio, upload auditions, and get discovered by industry professionals',
	},
	{
		id: 3,
		image: require('../../assets/images/onboard3.png'),
		title: 'Connect & Collaborate',
		description:
			'Network with casting directors, agents, and fellow performers in the industry',
	},
];

// Onboarding Screen
export default function Onboarding() {
	const router = useRouter();
	const { setHasFinishedOnboarding } = useAppStore();
	const [currentIndex, setCurrentIndex] = useState(0);
	const carouselRef = useRef<ICarouselInstance>(null);

	const handleNext = () => {
		if (currentIndex === onboardingData.length - 1) {
			finishOnboarding();
		} else {
			carouselRef.current?.next();
		}
	};

	const finishOnboarding = () => {
		setHasFinishedOnboarding(true);
		router.replace('/(public)/welcome');
	};

	const insets = useSafeAreaInsets();

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<View
				style={{
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
				}}
				className="flex-1 justify-between">
				{/* Top Bar with Skip Button */}
				<View className="flex-row justify-end px-6 pt-4">
					<TouchableOpacity onPress={finishOnboarding}>
						<Text className="text-black font-semibold text-base">Skip</Text>
					</TouchableOpacity>
				</View>

				{/* Main Content */}
				<View className="flex-1 justify-center items-center">
					<Carousel
						ref={carouselRef}
						width={width}
						height={width * 1.3}
						data={onboardingData}
						onSnapToItem={(index: number) => setCurrentIndex(index)}
						renderItem={({ item }: { item: (typeof onboardingData)[0] }) => (
							<View className="flex-1 items-center justify-center p-6">
								<Image
									source={item.image}
									className="w-64 h-64 mb-10"
									resizeMode="contain"
								/>
								<Text className="text-3xl font-bold text-center text-black mb-4">
									{item.title}
								</Text>
								<Text className="text-center text-gray-700 text-base px-4">
									{item.description}
								</Text>
							</View>
						)}
					/>
					{/* Pagination Dots */}
					<View className="flex-row justify-center mt-8 gap-x-3">
						{onboardingData.map((_, index) => (
							<View
								key={index}
								className={`h-2 rounded-full flex ${
									currentIndex === index ? 'bg-blue-400 w-8' : 'bg-blue-300 w-2'
								}`}
							/>
						))}
					</View>
				</View>

				{/* Bottom Button */}
				<View className="w-full px-6 mb-10">
					<TouchableOpacity
						onPress={handleNext}
						className="bg-[#5443DB] py-4 rounded-xl items-center shadow-lg shadow-blue-600/30">
						<Text className="text-white font-bold text-lg">
							{currentIndex === onboardingData.length - 1
								? 'Get Started'
								: 'Next'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
