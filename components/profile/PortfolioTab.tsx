import {
	FileText,
	Image as ImageIcon,
	PlayCircle,
	Upload,
	Video,
	X,
} from 'lucide-react-native';
import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
	Image,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import TextComponent from '../TextComponent';

type MediaType = 'photo' | 'video';

interface MediaItem {
	id: string;
	type: MediaType;
	uri: string;
	caption: string;
}

interface PortfolioFormData {
	resume: string | null;
	media: MediaItem[];
}

const PortfolioTab = () => {
	const { control, handleSubmit, setValue, watch } = useForm<PortfolioFormData>(
		{
			defaultValues: {
				resume: null,
				media: [
					{
						id: '1',
						type: 'photo',
						uri: 'https://i.pravatar.cc/300?img=32',
						caption: 'Professional Headshot',
					},
					{
						id: '2',
						type: 'video',
						uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
						caption: 'Demo Reel 2024',
					},
				],
			},
		},
	);

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'media',
	});

	const resumeUri = watch('resume');

	// Mock File Picker for Resume
	const handlePickResume = () => {
		// IN REAL APP: DocumentPicker.getDocumentAsync(...)
		setValue('resume', 'Daniel_Agbeni_Resume.pdf');
	};

	const handleRemoveResume = () => {
		setValue('resume', null);
	};

	// Mock Image Picker
	const handleAddPhoto = () => {
		// IN REAL APP: ImagePicker.launchImageLibraryAsync(...)
		append({
			id: Date.now().toString(),
			type: 'photo',
			uri: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`,
			caption: '',
		});
	};

	// Mock Video Picker
	const handleAddVideo = () => {
		// IN REAL APP: ImagePicker.launchImageLibraryAsync({ mediaTypes: ... })
		// Using a static image for video thumbnail representation
		append({
			id: Date.now().toString(),
			type: 'video',
			uri: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			caption: '',
		});
	};

	const onSubmit = (data: PortfolioFormData) => {
		console.log('Portfolio Data:', data);
		// TODO: Implement save logic
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<ScrollView
				className="flex-1 px-4 py-6"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 100 }}>
				<TextComponent className="text-xl font-bold text-gray-900 mb-1">
					Portfolio
				</TextComponent>
				<TextComponent className="text-sm text-gray-600 mb-6">
					Upload photos, videos, and your resume
				</TextComponent>

				{/* Résumé Section */}
				<View className="mb-8">
					<TextComponent className="text-gray-900 font-bold mb-3 text-base">
						Resume
					</TextComponent>
					{resumeUri ? (
						<View className="flex-row items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
							<View className="bg-red-50 p-3 rounded-lg mr-4">
								<FileText
									size={24}
									className="text-red-500"
								/>
							</View>
							<View className="flex-1">
								<TextComponent className="font-semibold text-gray-800 text-base">
									{resumeUri}
								</TextComponent>
								<TextComponent className="text-gray-500 text-xs">
									PDF Document • 2.4 MB
								</TextComponent>
							</View>
							<TouchableOpacity
								onPress={handleRemoveResume}
								className="p-2 bg-gray-50 rounded-full active:bg-gray-200">
								<X
									size={20}
									className="text-gray-500"
								/>
							</TouchableOpacity>
						</View>
					) : (
						<TouchableOpacity
							onPress={handlePickResume}
							className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 items-center justify-center active:bg-gray-50">
							<Upload
								size={32}
								className="text-gray-400 mb-2"
							/>
							<TextComponent className="text-gray-500 font-medium text-center">
								Upload Resume (PDF, DOC)
							</TextComponent>
						</TouchableOpacity>
					)}
				</View>

				{/* Media Controls */}
				<View className="flex-row gap-x-4 mb-6">
					<TouchableOpacity
						onPress={handleAddPhoto}
						className="flex-1 bg-[#E0F7FA] py-4 gap-2 rounded-xl items-center flex-row justify-center border border-[#B2EBF2] active:opacity-80">
						<ImageIcon
							size={20}
							className="text-teal-700 mr-2"
						/>
						<TextComponent className="font-semibold text-teal-800">
							Add Photo
						</TextComponent>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={handleAddVideo}
						className="flex-1 bg-[#F3E5F5] py-4 gap-2 rounded-xl items-center flex-row justify-center border border-[#E1BEE7] active:opacity-80">
						<Video
							size={20}
							className="text-purple-700 mr-2"
						/>
						<TextComponent className="font-semibold text-purple-800">
							Add Video
						</TextComponent>
					</TouchableOpacity>
				</View>

				{/* Media Grid */}
				<View className="flex-row flex-wrap justify-between">
					{fields.map((field, index) => (
						<View
							key={field.id}
							className="w-[48%] mb-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
							{/* Media Preview */}
							<View className="h-40 bg-gray-100 relative">
								<Image
									source={{ uri: field.uri }}
									className="w-full h-full"
									resizeMode="cover"
								/>
								{field.type === 'video' && (
									<View className="absolute inset-0 items-center justify-center bg-black/20">
										<PlayCircle
											size={40}
											className="text-white opacity-90"
										/>
									</View>
								)}
								{/* Delete Button */}
								<TouchableOpacity
									onPress={() => remove(index)}
									className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full backdrop-blur-sm active:bg-red-500">
									<X
										size={16}
										className="text-white"
									/>
								</TouchableOpacity>
							</View>

							{/* Caption Input */}
							<View className="p-3">
								<Controller
									control={control}
									name={`media.${index}.caption`}
									render={({ field: { onChange, onBlur, value } }) => (
										<TextInput
											className="text-gray-800 text-sm border-b border-gray-100 pb-1"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
											placeholder={
												field.type === 'photo'
													? 'Photo Caption...'
													: 'Video Title...'
											}
											placeholderTextColor="#9ca3af"
										/>
									)}
								/>
							</View>
						</View>
					))}
				</View>

				{fields.length === 0 && (
					<View className="items-center justify-center py-10 opacity-50">
						<TextComponent className="text-gray-500 text-center">
							Your portfolio is empty.{'\n'}Add media to showcase your work.
						</TextComponent>
					</View>
				)}
			</ScrollView>

			{/* Sticky Save Button */}
			<View className="absolute bottom-6 left-4 right-4">
				<TouchableOpacity
					className="bg-[#5B4DFF] py-4 rounded-xl items-center shadow-lg shadow-indigo-200 active:opacity-90"
					onPress={handleSubmit(onSubmit)}>
					<TextComponent className="text-white font-bold text-lg">
						Save Changes
					</TextComponent>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default PortfolioTab;
