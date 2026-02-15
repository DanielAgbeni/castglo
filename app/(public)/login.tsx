import { Link, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';
import { useAppStore } from '../../store';

export default function Login() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const setAuthenticated = useAppStore((state) => state.setAuthenticated);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
		// Simulate login
		setAuthenticated(true);
		router.replace('/(auth)/dashboard');
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<View
				style={{ paddingTop: insets.top }}
				className="flex-1">
				{/* Back Button */}
				<TouchableOpacity
					onPress={() => router.back()}
					className="absolute left-4 z-10 p-2 rounded-full bg-white/20"
					style={{ top: insets.top + 10 }}>
					<ChevronLeft
						size={24}
						color="black"
					/>
				</TouchableOpacity>

				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					keyboardShouldPersistTaps="handled">
					<View className="items-center mt-8 mb-6">
						<Image
							source={require('../../assets/images/logo.png')}
							className="w-40 h-10"
							resizeMode="contain"
						/>
					</View>

					<KeyboardAvoidingView
						behavior={Platform.OS === 'ios' ? 'padding' : undefined}
						className="flex-1 bg-white rounded-t-[40px] px-8 pt-10 pb-10 shadow-2xl">
						<View className="mb-8">
							<Text className="text-2xl font-bold text-center text-black mb-3">
								Welcome Back
							</Text>
							<Text className="text-gray-500 text-center px-4 leading-6">
								Sign in to continue
							</Text>
						</View>

						{/* Social Login */}
						<View className="gap-y-4 mb-8">
							<SocialButton
								label="Continue with Google"
								icon="logo-google"
								iconColor="#DB4437"
							/>
							<SocialButton
								label="Continue with Facebook"
								icon="logo-facebook"
								iconColor="#1877F2"
							/>
						</View>

						<View className="flex-row items-center mb-8">
							<View className="flex-1 h-[1px] bg-gray-200" />
							<Text className="mx-4 text-gray-400 text-xs font-bold tracking-wider">
								OR CONTINUE WITH EMAIL
							</Text>
							<View className="flex-1 h-[1px] bg-gray-200" />
						</View>

						{/* Form */}
						<View className="gap-y-5">
							<FormInput
								control={control}
								name="email"
								label="Email"
								placeholder="Enter your email"
								rules={{ required: 'Email is required' }}
								error={errors.email?.message as string}
							/>

							<View>
								<FormInput
									control={control}
									name="password"
									label="Password"
									placeholder="Enter your password"
									secureTextEntry
									rules={{ required: 'Password is required' }}
									error={errors.password?.message as string}
								/>
								<TouchableOpacity className="self-end mt-1">
									<Text className="text-[#5443DB] font-medium text-sm">
										Forgot Password?
									</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								onPress={handleSubmit(onSubmit)}
								className="bg-[#5443DB] py-5 rounded-2xl items-center mt-4 shadow-xl shadow-[#5443DB]/20">
								<Text className="text-white font-bold text-lg">Sign In</Text>
							</TouchableOpacity>

							<View className="flex-row justify-center mt-6 pb-10">
								<Text className="text-gray-600 font-medium text-base">
									Don't have an account?{' '}
								</Text>
								<Link href="/(public)/welcome">
									<Text className="text-[#5443DB] font-bold text-base">
										Sign up
									</Text>
								</Link>
							</View>
						</View>
					</KeyboardAvoidingView>
				</ScrollView>
			</View>
		</View>
	);
}
