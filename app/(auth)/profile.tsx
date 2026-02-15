import TextComponent from '@/components/TextComponent';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: '#AFEEEE' }}
			edges={['top']}>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#AFEEEE',
				}}>
				<TextComponent>Profile Settings</TextComponent>
			</View>
		</SafeAreaView>
	);
}
