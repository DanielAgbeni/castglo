import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { Check, ChevronLeft } from 'lucide-react-native';
import { useState } from 'react';
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

export default function Signup() {
	const { role } = useLocalSearchParams<{ role: string }>();
	const router = useRouter();
	const insets = useSafeAreaInsets();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [agreeToTerms, setAgreeToTerms] = useState(false);

	const onSubmit = (data: any) => {
		if (!agreeToTerms) {
			alert('Please agree to the Terms of Service and Privacy Policy');
			return;
		}
		console.log(data);
		// Proceed to next step or API call
	};

	const getRoleTitle = () => {
		switch (role) {
			case 'Talent':
				return 'Join as Talent';
			case 'Casting Director':
				return 'Join as Casting Director';
			case 'Industry Professional':
				return 'Join as Industry Professional';
			default:
				return 'Join Castglo';
		}
	};

	const getRoleDescription = () => {
		switch (role) {
			case 'Talent':
				return 'Showcase your skills and connect with casting directors';
			case 'Casting Director':
				return 'Find and manage top talent for your projects';
			case 'Industry Professional':
				return 'Discover and represent the best talent in the industry';
			default:
				return 'Create an account to get started';
		}
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
								{getRoleTitle()}
							</Text>
							<Text className="text-gray-500 text-center px-4 leading-6">
								{getRoleDescription()}
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
						<View className="gap-y-2">
							<FormInput
								control={control}
								name="email"
								label="Email"
								placeholder="Enter your email"
								rules={{ required: 'Email is required' }}
								error={errors.email?.message as string}
							/>

							<FormInput
								control={control}
								name="password"
								label="Password"
								placeholder="Create a password"
								secureTextEntry
								rules={{ required: 'Password is required' }}
								error={errors.password?.message as string}
							/>

							<FormInput
								control={control}
								name="confirmPassword"
								label="Confirm Password"
								placeholder="Confirm your password"
								secureTextEntry
								rules={{ required: 'Please confirm your password' }}
								error={errors.confirmPassword?.message as string}
							/>

							{/* Terms Checkbox */}
							<TouchableOpacity
								className="flex-row items-start mt-2"
								onPress={() => setAgreeToTerms(!agreeToTerms)}>
								<View
									className={`w-5 h-5 border rounded mr-3 items-center justify-center ${
										agreeToTerms
											? 'bg-[#5443DB] border-[#5443DB]'
											: 'border-gray-300 bg-white'
									}`}>
									{agreeToTerms && (
										<Check
											size={14}
											color="white"
										/>
									)}
								</View>
								<Text className="text-gray-600 text-sm flex-1 leading-5">
									I agree to the{' '}
									<Text className="text-black font-semibold">
										Terms of Service
									</Text>{' '}
									and{' '}
									<Text className="text-black font-semibold">
										Privacy Policy
									</Text>
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={handleSubmit(onSubmit)}
								className="bg-[#5443DB] py-5 rounded-2xl items-center mt-4 shadow-xl shadow-[#5443DB]/20">
								<Text className="text-white font-bold text-lg">
									Create Account
								</Text>
							</TouchableOpacity>

							<Text className="text-gray-400 text-center text-xs mt-6 px-10 leading-5">
								This site is protected by reCAPTCHA and the Google{' '}
								<Text className="underline hover:text-gray-600">
									Privacy Policy
								</Text>{' '}
								and{' '}
								<Text className="underline hover:text-gray-600">
									Terms of Service
								</Text>{' '}
								apply.
							</Text>

							<View className="flex-row justify-center mt-2 pb-10">
								<Text className="text-gray-600 font-medium text-base">
									Already have an account?{' '}
								</Text>
								<Link href="/(public)/login">
									<Text className="text-[#5443DB] font-bold text-base">
										Sign in
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
