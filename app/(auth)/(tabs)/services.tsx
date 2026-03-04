import ServiceCard, { ServiceItem } from '@/components/services/ServiceCard';
import ServiceModal, { ServiceFormData } from '@/components/services/ServiceModal';
import TextComponent from '@/components/TextComponent';
import { FlashList } from '@shopify/flash-list';
import { Newspaper, Plus } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INITIAL_SERVICES: ServiceItem[] = [
	{
		id: '1',
		title: 'Professional Headshot Session',
		isActive: true,
		bookingsCount: 24,
		description:
			'High-quality headshots for actors, models, and performers. Includes 2-hour session with multiple outfit changes and professional retouching.',
		price: 250,
		duration: '2 hours',
	},
	{
		id: '2',
		title: 'Portfolio Photography',
		isActive: true,
		bookingsCount: 24,
		description:
			'Complete portfolio shoot with various looks and settings. Perfect for building your professional portfolio.',
		price: 450,
		duration: '4 hours',
	},
	{
		id: '3',
		title: 'Styling Consultation',
		isActive: true,
		bookingsCount: 13,
		description:
			'One-on-one styling session to help you find your best look for auditions and performances.',
		price: 150,
		duration: '1 hour',
	},
	{
		id: '4',
		title: 'Makeup & Hair Services',
		isActive: true,
		bookingsCount: 29,
		description:
			'Professional makeup and hair styling for photoshoots, auditions, or performances.',
		price: 100,
		duration: '1.5 hours',
	},
];

export default function Services() {
	const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
	const [isModalVisible, setModalVisible] = useState(false);
	const [editingServiceId, setEditingServiceId] = useState<string | null>(null);

	const handleEdit = useCallback((id: string) => {
		setEditingServiceId(id);
		setModalVisible(true);
	}, []);

	const handleDelete = useCallback((id: string) => {
		setServices((prev) => prev.filter((service) => service.id !== id));
	}, []);

	const handleViewDetails = useCallback((id: string) => {
		console.log('View details', id);
	}, []);

	const handleAddNew = () => {
		setEditingServiceId(null);
		setModalVisible(true);
	};

	const handleSaveService = (data: ServiceFormData) => {
		if (editingServiceId) {
			// Update existing
			setServices((prev) =>
				prev.map((srv) =>
					srv.id === editingServiceId
						? {
								...srv,
								...data,
								price: parseFloat(data.price) || 0,
						  }
						: srv
				)
			);
		} else {
			// Create new
			const newService: ServiceItem = {
				id: Math.random().toString(),
				isActive: true, // Default to true
				bookingsCount: 0,
				...data,
				price: parseFloat(data.price) || 0,
			};
			setServices((prev) => [newService, ...prev]);
		}
	};

	const editingServiceData = editingServiceId
		? services.find((s) => s.id === editingServiceId)
		: null;
	const initialModalData = editingServiceData
		? {
				title: editingServiceData.title,
				description: editingServiceData.description,
				price: editingServiceData.price.toString(),
				duration: editingServiceData.duration,
		  }
		: null;

	return (
		<SafeAreaView
			style={{ flex: 1 }}
			edges={['top']}>
			<View style={{ flex: 1, backgroundColor: '#AFEEEE' }}>
				{/* Header */}
				<View className="bg-white px-5 py-4 pb-4">
					<View className="flex-row items-center justify-between">
						<TextComponent className="text-2xl font-bold text-black">Services</TextComponent>
						<View className="flex-row items-center gap-x-4">
							<TouchableOpacity 
								onPress={handleAddNew}
								className="bg-[#5a4ddb] px-3 py-1.5 rounded-lg flex-row items-center gap-x-1"
							>
								<Plus size={18} color="#fff" />
								<TextComponent className="text-white font-medium">Add New</TextComponent>
							</TouchableOpacity>
							<Newspaper size={24} color="#000" />
						</View>
					</View>
				</View>

				{/* Content */}
				<View style={{ flex: 1 }}>
					<FlashList
						data={services}
						renderItem={({ item }) => (
							<ServiceCard
								item={item}
								onEdit={() => handleEdit(item.id)}
								onDelete={() => handleDelete(item.id)}
								onViewDetails={() => handleViewDetails(item.id)}
							/>
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 20 }}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>

			<ServiceModal
				visible={isModalVisible}
				onClose={() => setModalVisible(false)}
				onSave={handleSaveService}
				initialData={initialModalData}
			/>
		</SafeAreaView>
	);
}
