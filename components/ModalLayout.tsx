import React, { forwardRef, memo } from 'react';
import { Modal, ModalProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export type TModalLayoutProp = {
	onClose: () => void;
} & ModalProps;

const ModalLayout = forwardRef<Modal, TModalLayoutProp>(
	(
		{
			onClose = () => {},
			onRequestClose,
			statusBarTranslucent = true,
			visible,
			children,
			...props
		},
		ref,
	) => {
		return (
			<Modal
				onRequestClose={(e) => {
					if (onRequestClose) {
						onRequestClose(e);
					}
					onClose();
				}}
				statusBarTranslucent={statusBarTranslucent}
				ref={ref}
				visible={visible}
				{...props}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					{children}
				</GestureHandlerRootView>
			</Modal>
		);
	},
);

ModalLayout.displayName = 'Modal layout';

export default memo(ModalLayout);
