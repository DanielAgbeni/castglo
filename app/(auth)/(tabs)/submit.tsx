import ModalLayout from '@/components/ModalLayout';
import TextComponent from '@/components/TextComponent';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CloudUpload, FileText, Film, Search, Upload } from 'lucide-react-native';
import React, { useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Submit() {
	const router = useRouter();
	const params = useLocalSearchParams();
	const { castingCallId } = params;
	const [notes, setNotes] = useState('');
	const [uploadModalVisible, setUploadModalVisible] = useState(false);
	const [successModalVisible, setSuccessModalVisible] = useState(false);

	const castingCall = {
		id: '1',
		title: 'Lead Role - Indie Drama',
		productionCompany: 'Moonlight Studios',
		location: 'Los Angeles, CA',
		imageUrl:
			'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2670&auto=format&fit=crop',
		tags: ['Drama'],
	};

	const handleUpload = () => setUploadModalVisible(true);
	const handleSubmit = () => setSuccessModalVisible(true);

	if (!castingCallId) {
		return (
			<SafeAreaView
				className="flex-1 bg-[#AFEEEE] justify-center items-center px-6"
				edges={['top']}>
				<View className="bg-white/40 p-8 rounded-full mb-8 shadow-sm">
					<Film
						size={72}
						color="#5b4be0"
					/>
				</View>
				<TextComponent className="text-3xl font-extrabold text-[#1f2937] text-center mb-4">
					No Casting Call
				</TextComponent>
				<TextComponent className="text-center text-gray-700 text-base mb-10 px-4 leading-relaxed">
					You need to select a casting call to submit an audition. Browse available roles and find your next big opportunity!
				</TextComponent>
				<TouchableOpacity
					className="flex-row items-center justify-center bg-[#5b4be0] px-8 py-4 rounded-2xl shadow-md w-full max-w-[300px]"
					onPress={() => router.push('/(auth)/(tabs)/search')}
					activeOpacity={0.8}>
					<Search
						size={22}
						color="#FFF"
						className="mr-3"
					/>
					<TextComponent className="text-white font-bold text-lg">
						Browse Roles
					</TextComponent>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	return (
		<>
			<SafeAreaView
				className="flex-1 bg-[#AFEEEE]"
				edges={['top']}>
				<View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100 bg-white">
					<TextComponent
						size="large"
						className="font-bold text-xl">
						Submit Audition
					</TextComponent>
					<FileText
						size={24}
						color="#000"
					/>
				</View>

				<ScrollView
					className="flex-1 p-4"
					showsVerticalScrollIndicator={false}>
					<TextComponent className="mb-4 text-gray-700">
						Upload your audition video for this casting call
					</TextComponent>

					{/* Casting Call Card */}
					<View className="flex-row bg-[#F0FDFD] p-3 rounded-xl mb-6 shadow-sm border border-gray-100">
						<Image
							source={{ uri: castingCall.imageUrl }}
							className="w-20 h-20 rounded-lg mr-3"
							resizeMode="cover"
						/>
						<View className="flex-1 justify-center">
							<TextComponent
								className="font-bold text-lg mb-1"
								numberOfLines={1}>
								{castingCall.title}
							</TextComponent>
							<TextComponent
								className="text-gray-600 mb-2"
								size="small">
								{castingCall.productionCompany}
							</TextComponent>
							<View className="flex-row items-center justify-between mt-1">
								<View className="bg-gray-300 px-2 py-0.5 rounded">
									<TextComponent
										size="small"
										className="text-gray-700 font-medium">
										{castingCall.tags[0]}
									</TextComponent>
								</View>
								<TextComponent
									size="small"
									className="text-gray-500">
									{castingCall.location}
								</TextComponent>
							</View>
						</View>
					</View>

					{/* Upload Section */}
					<View className="bg-[#F0FDFD] p-4 rounded-xl mb-6 shadow-sm border border-gray-100">
						<TextComponent
							className="font-bold text-lg mb-1"
							size="large">
							Upload Audition Video
						</TextComponent>
						<TextComponent className="text-gray-500 mb-4 text-xs">
							Upload your MP4 audition video (max 200MB)
						</TextComponent>

						<TouchableOpacity
							className="border-2 border-dashed border-gray-300 rounded-xl p-8 items-center justify-center bg-white"
							onPress={handleUpload}>
							<View className="mb-3">
								<Upload
									size={40}
									color="#000"
								/>
							</View>
							<TextComponent className="font-bold text-base mb-1">
								Upload your audition video
							</TextComponent>
							<TextComponent className="text-gray-400 text-xs mb-4">
								MP4 format, maximum 200MB
							</TextComponent>
							<View className="flex-row items-center bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm">
								<CloudUpload
									size={20}
									color="#000"
									className="mr-2"
								/>
								<TextComponent className="font-bold">Choose File</TextComponent>
							</View>
						</TouchableOpacity>
					</View>

					{/* Additional Notes */}
					<View className="bg-[#F0FDFD] p-4 rounded-xl mb-6 shadow-sm border border-gray-100">
						<TextComponent
							className="font-bold text-lg mb-1"
							size="large">
							Additional Notes
						</TextComponent>
						<TextComponent className="text-gray-500 mb-4 text-xs">
							Any additional information you'd like to share (optional)
						</TextComponent>

						<TextInput
							className="bg-white border border-gray-200 rounded-lg p-3 h-32 text-gray-700"
							placeholder="Tell the casting director anything else about your audition or experience"
							multiline
							textAlignVertical="top"
							value={notes}
							onChangeText={setNotes}
						/>
					</View>
				</ScrollView>

				{/* Submit Button */}
				<View className="p-4 bg-white border-t border-gray-100">
					<TouchableOpacity
						className="bg-[#5b4be0] py-4 rounded-xl items-center shadow-md"
						onPress={handleSubmit}>
						<TextComponent className="text-white font-bold text-lg">
							Submit Audition
						</TextComponent>
					</TouchableOpacity>
				</View>
			</SafeAreaView>

			{/* Upload Modal */}
			<ModalLayout
				visible={uploadModalVisible}
				transparent
				animationType="fade"
				onClose={() => setUploadModalVisible(false)}>
				<Pressable
					className="flex-1 bg-black/40 justify-center items-center"
					onPress={() => setUploadModalVisible(false)}>
					<View className="bg-white rounded-2xl p-6 w-[85%]">
						<TextComponent className="text-lg font-bold text-gray-900 mb-2">
							Upload
						</TextComponent>
						<TextComponent className="text-gray-500 mb-6">
							File picker would open here
						</TextComponent>
						<TouchableOpacity
							className="bg-indigo-600 py-3 rounded-xl items-center"
							onPress={() => setUploadModalVisible(false)}>
							<TextComponent className="text-white font-bold">OK</TextComponent>
						</TouchableOpacity>
					</View>
				</Pressable>
			</ModalLayout>

			{/* Success Modal */}
			<ModalLayout
				visible={successModalVisible}
				transparent
				animationType="fade"
				onClose={() => setSuccessModalVisible(false)}>
				<Pressable
					className="flex-1 bg-black/40 justify-center items-center"
					onPress={() => setSuccessModalVisible(false)}>
					<View className="bg-white rounded-2xl p-6 w-[85%]">
						<TextComponent className="text-lg font-bold text-gray-900 mb-2">
							Success
						</TextComponent>
						<TextComponent className="text-gray-500 mb-6">
							Audition submitted successfully!
						</TextComponent>
						<TouchableOpacity
							className="bg-indigo-600 py-3 rounded-xl items-center"
							onPress={() => {
								setSuccessModalVisible(false);
								router.push('/(auth)/(tabs)/dashboard');
							}}>
							<TextComponent className="text-white font-bold">OK</TextComponent>
						</TouchableOpacity>
					</View>
				</Pressable>
			</ModalLayout>
		</>
	);
}
