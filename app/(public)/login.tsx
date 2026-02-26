import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	ActivityIndicator,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import * as z from 'zod';

import { login } from '../../api/auth';
import FormInput from '../../components/FormInput';
import SocialButton from '../../components/SocialButton';
import { useAppStore } from '../../store';

const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const { setAuthenticated, setToken, setUser } = useAppStore();
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const toast = useToast();

	const onSubmit = async (data: LoginFormData) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const response = await login(data);
			if (response.data.success) {
				const { user, token } = response.data.data;
				setUser(user);
				setToken(token);
				setAuthenticated(true);
				toast.show('Login Successful', {
					type: 'success',
					placement: 'top',
					duration: 4000,
					animationType: 'slide-in',
				});
				router.replace('/(auth)/(tabs)/dashboard');
			} else {
				toast.show(response.data.message || 'Login Failed', {
					type: 'danger',
					placement: 'top',
					duration: 4000,
					animationType: 'slide-in',
				});
			}
		} catch (error: any) {
			console.log(error);
			toast.show(error.response?.data?.message || 'Something went wrong', {
				type: 'danger',
				placement: 'top',
				duration: 4000,
				animationType: 'slide-in',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<View className="flex-1 bg-[#AFEEEE]">
			<View
				style={{ paddingTop: insets.top }}
				className="flex-1">
				{/* Back Button */}
				<TouchableOpacity
					onPress={() => {
						if (router.canGoBack()) {
							router.back();
						} else {
							router.replace('/(public)/onboarding');
						}
					}}
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
								error={errors.email?.message}
							/>

							<View>
								<FormInput
									control={control}
									name="password"
									label="Password"
									placeholder="Enter your password"
									secureTextEntry
									error={errors.password?.message}
								/>
								<TouchableOpacity className="self-end mt-1">
									<Text className="text-[#5443DB] font-medium text-sm">
										Forgot Password?
									</Text>
								</TouchableOpacity>
							</View>

							<TouchableOpacity
								onPress={handleSubmit(onSubmit)}
								disabled={isLoading}
								className={`bg-[#5443DB] py-5 rounded-2xl items-center mt-4 shadow-xl shadow-[#5443DB]/20 ${
									isLoading ? 'opacity-70' : ''
								}`}>
								{isLoading ? (
									<ActivityIndicator color="white" />
								) : (
									<Text className="text-white font-bold text-lg">Sign In</Text>
								)}
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
