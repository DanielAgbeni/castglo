import BookingDetailsModal from '@/components/booking/BookingDetailsModal';
import BookingItem, { BookingData } from '@/components/booking/BookingItem';
import TextComponent from '@/components/TextComponent';
import { FlashList } from '@shopify/flash-list';
import { Newspaper } from 'lucide-react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_BOOKINGS: BookingData[] = [
	{
		id: '1',
		userName: 'Sarah Johnson',
		initials: 'S',
		serviceType: 'Professional Headshot Session',
		date: '1/18/2024',
		time: '10:00 AM',
		location: 'Studio A, Downtown',
		price: 250,
		status: 'confirmed',
	},
	{
		id: '2',
		userName: 'Michael Chen',
		initials: 'M',
		serviceType: 'Portfolio Photography',
		date: '1/20/2024',
		time: '2:00 PM',
		location: 'Outdoor Location - Central Park',
		price: 450,
		status: 'confirmed',
	},
	{
		id: '3',
		userName: 'Emma Rodriguez',
		initials: 'E',
		serviceType: 'Styling Consultation',
		date: '1/22/2024',
		time: '11:00 AM',
		location: "Client's Home",
		price: 150,
		status: 'pending',
		notes: 'Client prefers natural lighting. Bring multiple outfit options.',
	},
	{
		id: '4',
		userName: 'David Kim',
		initials: 'D',
		serviceType: 'Makeup & Hair Services',
		date: '1/15/2024',
		time: '9:00 AM', // Added time since details modal needs it
		location: 'Studio B, Midtown',
		price: 250,
		status: 'completed',
		notes: 'Great session! Client was very happy with the results.',
	},
];

type TabType = 'upcoming' | 'completed';

export default function Booking() {
	const [activeTab, setActiveTab] = useState<TabType>('upcoming');
	const [bookings, setBookings] = useState<BookingData[]>(INITIAL_BOOKINGS);
	const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const filteredBookings = useMemo(() => {
		if (activeTab === 'upcoming') {
			return bookings.filter(
				(b) => b.status === 'confirmed' || b.status === 'pending'
			);
		}
		return bookings.filter((b) => b.status === 'completed');
	}, [bookings, activeTab]);

	const handleViewDetails = useCallback((booking: BookingData) => {
		setSelectedBooking(booking);
		setIsModalVisible(true);
	}, []);

	const handleMessage = useCallback((booking: BookingData) => {
		console.log('Sending message for booking:', booking.id);
		setIsModalVisible(false);
	}, []);

	const handleAccept = useCallback((id: string) => {
		setBookings((prev) =>
			prev.map((b) => (b.id === id ? { ...b, status: 'confirmed' } : b))
		);
	}, []);

	const handleDecline = useCallback((id: string) => {
		setBookings((prev) => prev.filter((b) => b.id !== id));
	}, []);

	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View style={{ flex: 1, backgroundColor: '#AFEEEE' }}>
				{/* Header */}
				<View className="bg-white px-5 py-4 pb-4">
					<View className="flex-row items-center justify-between">
						<TextComponent className="text-2xl font-bold text-black">
							Bookings
						</TextComponent>
						<Newspaper size={24} color="#000" />
					</View>
				</View>

				{/* Tabs Container */}
				<View className="flex-row mx-4 mt-4 bg-white rounded-xl p-1 shadow-sm border border-teal-100">
					<TouchableOpacity
						onPress={() => setActiveTab('upcoming')}
						className={`flex-1 py-2.5 items-center rounded-lg ${
							activeTab === 'upcoming' ? 'bg-[#5a4ddb]' : 'bg-transparent'
						}`}>
						<TextComponent
							className={`font-semibold ${
								activeTab === 'upcoming' ? 'text-white' : 'text-gray-700'
							}`}>
							Upcoming
						</TextComponent>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => setActiveTab('completed')}
						className={`flex-1 py-2.5 items-center rounded-lg ${
							activeTab === 'completed' ? 'bg-[#5a4ddb]' : 'bg-transparent'
						}`}>
						<TextComponent
							className={`font-semibold ${
								activeTab === 'completed' ? 'text-white' : 'text-gray-700'
							}`}>
							Completed
						</TextComponent>
					</TouchableOpacity>
				</View>

				{/* Content */}
				<View style={{ flex: 1 }}>
					<FlashList
						data={filteredBookings}
						renderItem={({ item }) => (
							<BookingItem
								booking={item}
								onViewDetails={handleViewDetails}
								onAccept={handleAccept}
								onDecline={handleDecline}
							/>
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>

			<BookingDetailsModal
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
				booking={selectedBooking}
				onMessage={handleMessage}
			/>
		</SafeAreaView>
	);
}
