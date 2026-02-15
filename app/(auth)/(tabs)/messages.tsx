import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Messages() {
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
				<Text>Messages</Text>
			</View>
		</SafeAreaView>
	);
}
