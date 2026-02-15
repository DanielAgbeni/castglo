import TextComponent from '@/components/TextComponent';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
	Calendar,
	ChevronLeft,
	DollarSign,
	MapPin,
	Users,
} from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CastingCallDetails() {
	const router = useRouter();
	const { id } = useLocalSearchParams();

	// Mock Data - In a real app, fetch based on ID
	const castingCall = {
		id: '1',
		title: 'Lead Role - Indie Drama',
		productionCompany: 'Moonlight Studios',
		description:
			"We are seeking a passionate and experienced actor for the lead role in our upcoming indie drama 'Echoes of Tomorrow'. This is a character-driven story about family relationships, loss, and redemption set in contemporary Los Angeles.",
		requirements: [
			'Previous film experience required',
			'Method acting background preferred',
			'Available for 6-week shoot starting March 1st',
			'Must be comfortable with emotional scenes',
			'Los Angeles area resident preferred',
		],
		responsibilities: [
			"Lead character 'Alex' - complex emotional journey",
			'Work closely with director on character development',
			'Collaborate with ensemble cast of 8 actors',
			'Participate in 2 weeks of rehearsals',
			'Available for promotional activities',
		],
		quickInfo: {
			location: 'New York, NY',
			deadline: 'Deadline: 1/20/2024',
			dates: 'March 1 - April 12, 2024',
			pay: '$50K - $100K',
			ageRange: 'Age Range: 25-35',
		},
		team: {
			director: 'Sarah Johnson',
			castingDirector: 'Maria Rodriguez',
		},
		imageUrl:
			'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2670&auto=format&fit=crop',
	};

	return (
		<SafeAreaView
			className="flex-1 bg-[#AFEEEE]"
			edges={['top']}>
			<View className="flex-1">
				{/* Header */}
				<View className="flex-row items-center border-b border-gray-100 px-4 py-3">
					<TouchableOpacity
						onPress={() => router.back()}
						className="mr-3">
						<ChevronLeft
							size={24}
							color="#000"
						/>
					</TouchableOpacity>
					<TextComponent
						size="large"
						className="font-bold flex-1"
						numberOfLines={1}>
						{castingCall.title}
					</TextComponent>
				</View>

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingBottom: 40 }}>
					{/* Hero Section */}
					<View className="relative h-64 w-full">
						<Image
							source={{ uri: castingCall.imageUrl }}
							className="h-full w-full"
							resizeMode="cover"
						/>
						<View className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
							<View className="mb-2 self-start rounded bg-[#22c55e] px-2 py-0.5">
								<TextComponent
									size="small"
									className="font-bold text-white">
									Open
								</TextComponent>
							</View>
							<TextComponent
								size="large"
								className="text-2xl font-bold text-white">
								{castingCall.title}
							</TextComponent>
							<TextComponent
								size="medium"
								className="text-white">
								{castingCall.productionCompany}
							</TextComponent>
						</View>
					</View>

					<View className="bg-[#AFEEEE] px-4 pt-4 pb-8">
						{/* Project Description */}
						<View className="mb-4 rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-2 font-bold">
								Project Description
							</TextComponent>
							<TextComponent className="leading-5 text-gray-700">
								{castingCall.description}
							</TextComponent>
						</View>

						{/* Requirements */}
						<View className="mb-4 rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-2 font-bold">
								Requirements
							</TextComponent>
							<View className="gap-2">
								{castingCall.requirements.map((req, index) => (
									<View
										key={index}
										className="flex-row items-start">
										<View className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-cyan-400" />
										<TextComponent className="flex-1 text-gray-700">
											{req}
										</TextComponent>
									</View>
								))}
							</View>
						</View>

						{/* Role Responsibilities */}
						<View className="mb-4 rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-2 font-bold">
								Role Responsibilities
							</TextComponent>
							<View className="gap-2">
								{castingCall.responsibilities.map((resp, index) => (
									<View
										key={index}
										className="flex-row items-start">
										<View className="mt-1.5 mr-2 h-2 w-2 rounded-full bg-pink-400" />
										<TextComponent className="flex-1 text-gray-700">
											{resp}
										</TextComponent>
									</View>
								))}
							</View>
						</View>

						{/* Quick Info */}
						<View className="mb-4 rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-4 font-bold">
								Quick Info
							</TextComponent>
							<View className="gap-4">
								<View className="flex-row items-start">
									<MapPin
										size={20}
										color="#374151"
										className="mr-3 mt-0.5"
									/>
									<View>
										<TextComponent className="font-semibold text-gray-700">
											{castingCall.quickInfo.location}
										</TextComponent>
										<TextComponent
											size="small"
											className="text-gray-500">
											{castingCall.quickInfo.deadline}
										</TextComponent>
									</View>
								</View>

								<View className="flex-row items-center">
									<Calendar
										size={20}
										color="#374151"
										className="mr-3"
									/>
									<TextComponent className="text-gray-700">
										{castingCall.quickInfo.dates}
									</TextComponent>
								</View>

								<View className="flex-row items-center">
									<DollarSign
										size={20}
										color="#374151"
										className="mr-3"
									/>
									<TextComponent className="text-gray-700">
										{castingCall.quickInfo.pay}
									</TextComponent>
								</View>

								<View className="flex-row items-center">
									<Users
										size={20}
										color="#374151"
										className="mr-3"
									/>
									<TextComponent className="text-gray-700">
										{castingCall.quickInfo.ageRange}
									</TextComponent>
								</View>

								{/* Badge */}
								<View className="mt-2 self-start rounded bg-gray-300 px-2 py-1">
									<TextComponent
										size="small"
										className="font-semibold text-gray-700">
										Drama
									</TextComponent>
								</View>
							</View>
						</View>

						{/* Casting Team */}
						<View className="mb-4 rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-2 font-bold">
								Casting Team
							</TextComponent>
							<View className="mb-2">
								<TextComponent className="font-medium text-gray-900">
									Director
								</TextComponent>
								<TextComponent className="text-gray-600">
									{castingCall.team.director}
								</TextComponent>
							</View>
							<View>
								<TextComponent className="font-medium text-gray-900">
									Casting Director
								</TextComponent>
								<TextComponent className="text-gray-600">
									{castingCall.team.castingDirector}
								</TextComponent>
							</View>
						</View>

						{/* Ready to Apply */}
						<View className="rounded-xl bg-[#F0FDFD] p-4 shadow-sm">
							<TextComponent
								size="large"
								className="mb-1 font-bold">
								Ready to Apply?
							</TextComponent>
							<TextComponent className="mb-4 text-gray-600">
								Submit your audition for this role
							</TextComponent>
							<TouchableOpacity className="rounded-lg bg-[#5b4be0] py-3 items-center">
								<TextComponent className="font-bold text-white">
									Submit Audition
								</TextComponent>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	);
}
