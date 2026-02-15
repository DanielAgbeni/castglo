import React, { memo } from 'react';
import { Text, TextProps } from 'react-native';

// You can replace these with your actual font family names when you have them.
// For now, we'll use system fonts or a placeholder.
const FONTS = {
	regular: 'System', // e.g., 'Inter-Regular'
	medium: 'System', // e.g., 'Inter-Medium'
	bold: 'System', // e.g., 'Inter-Bold'
	light: 'System', // e.g., 'Inter-Light'
};

interface CustomTextProps extends TextProps {
	bold?: boolean;
	medium?: boolean;
	light?: boolean;
}

const TextComponent = memo(
	({ style, bold, medium, light, children, ...props }: CustomTextProps) => {
		let fontFamily = FONTS.regular;
		let fontWeight: any = '400';

		if (bold) {
			fontFamily = FONTS.bold;
			fontWeight = '700';
		} else if (medium) {
			fontFamily = FONTS.medium;
			fontWeight = '500';
		} else if (light) {
			fontFamily = FONTS.light;
			fontWeight = '300';
		}

		return (
			<Text
				style={[
					{ fontFamily, fontWeight }, // Apply font family and weight
					style,
				]}
				{...props}>
				{children}
			</Text>
		);
	},
);

TextComponent.displayName = 'TextComponent';

export default TextComponent;
