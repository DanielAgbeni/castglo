import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef, memo } from 'react';
import { Text, TextProps } from 'react-native';

const getTextClassName = cva(['font-proximanova text-black'], {
	variants: {
		size: {
			small: 'text-xs',
			medium: 'text-base',
			large: 'text-lg',
		},
	},
	defaultVariants: {
		size: 'medium',
	},
});

export type TTextComponentProp = {
	size?: 'small' | 'medium' | 'large';
} & TextProps &
	VariantProps<typeof getTextClassName>;

const TextComponent = forwardRef<
	React.ElementRef<typeof Text>,
	TTextComponentProp
>(({ size, className, children, ...props }, ref) => {
	return (
		<Text
			className={cn(getTextClassName({ size }), className)}
			ref={ref}
			{...props}>
			{children}
		</Text>
	);
});

TextComponent.displayName = 'TextComponent';

export default memo(TextComponent);
