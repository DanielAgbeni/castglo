import { Button, Text, View } from 'react-native';
import { useAppStore } from '../../store';

export default function Home() {
	const setAuthenticated = useAppStore((state) => state.setAuthenticated);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Welcome Home!</Text>
			<Button
				title="Logout"
				onPress={() => setAuthenticated(false)}
			/>
		</View>
	);
}
