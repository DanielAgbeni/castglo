import TextComponent from '@/components/TextComponent';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VirtualAssistant() {
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
				<TextComponent className="font-bold text-xl">Virtual Assistant</TextComponent>
			</View>
		</SafeAreaView>
	);
}
