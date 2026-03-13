import { useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

export const ToastHandler = () => {
	const toast = useToast();

	useEffect(() => {
		const subscription = DeviceEventEmitter.addListener(
			'show-toast',
			(data: { message: string; type?: 'normal' | 'success' | 'danger' | 'warning' }) => {
				toast.show(data.message, {
					type: data.type || 'normal',
					duration: 4000,
					placement: 'bottom',
				});
			}
		);

		return () => {
			subscription.remove();
		};
	}, [toast]);

	return null;
};
