import { FileText } from 'lucide-react-native';
import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextComponent from '../TextComponent';

interface DashboardHeaderProps {
	userName?: string;
	notificationCount?: number;
}

const DashboardHeader = memo(
	({ userName = 'Back', notificationCount = 3 }: DashboardHeaderProps) => {
		return (
			<View className="flex-row items-center justify-between">
				<View>
					<TextComponent className="text-2xl font-bold">
						Welcome {userName}
					</TextComponent>
					<TextComponent className="text-gray-600 text-lg font-medium">
						You have {notificationCount} new opportunities
					</TextComponent>
				</View>
				<TouchableOpacity className="relative p-2 bg-white rounded-lg border border-gray-200">
					<FileText
						size={24}
						color="black"
					/>
					{/* The icon in the design looks like a document/news icon, 
            FileText is a close approximation from Lucide. 
            There isn't a specific red dot in the design provided, 
            but usually notifications imply one. 
            The design shows a document icon. 
        */}
				</TouchableOpacity>
			</View>
		);
	},
);

DashboardHeader.displayName = 'DashboardHeader';

export default DashboardHeader;
