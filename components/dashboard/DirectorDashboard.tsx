import { useMyCastingCallsInfinite } from '@/api/casting-call';
import { formatDate, getLocationLabel } from '@/lib/castingCallUtils';
import { CastingCall, CastingCallStatus } from '@/types';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Star, Zap } from 'lucide-react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import TextComponent from '../TextComponent';
import CastingCallCard from './CastingCallCard';
import StatsCard from './StatsCard';

const mapStatus = (status: CastingCallStatus): 'Open' | 'Closed' => {
	return status === 'open' ? 'Open' : 'Closed';
};

const DirectorDashboard = () => {
	const router = useRouter();
	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
		isRefetching,
	} = useMyCastingCallsInfinite();

	const castingCalls = useMemo<CastingCall[]>(
		() => data?.pages.flatMap((page) => page.data.castingCalls) ?? [],
		[data],
	);

	const handleView = useCallback(
		(id: string) => {
			router.push(`/casting-call/${id}`);
		},
		[router],
	);

	const handleManage = handleView;

	const handleEndReached = useCallback(() => {
		if (isLoading || isFetchingNextPage || !hasNextPage) return;
		fetchNextPage();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

	const handleRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	const renderHeader = () => (
		<View>
			<View className="flex-row justify-between mb-8 gap-x-4">
				<StatsCard
					title="Total Submissions"
					count={127}
					Icon={Zap}
					iconColor="#0891b2"
					bgColor="#EEFAFF"
				/>
				<StatsCard
					title="Pending Review"
					count={21}
					Icon={Star}
					iconColor="#a855f7"
					bgColor="#F5F0FF"
				/>
			</View>

			<TextComponent className="text-xl font-bold mb-4">
				Active Casting Calls
			</TextComponent>
		</View>
	);

	if (isLoading && !data) {
		return (
			<View className="flex-1 px-5 pt-5">
				{/* Stats skeleton */}
				<View className="flex-row justify-between mb-8 gap-x-4">
					<View className="flex-1 bg-gray-100 rounded-xl h-24" />
					<View className="flex-1 bg-gray-100 rounded-xl h-24" />
				</View>

				{/* Title skeleton */}
				<View className="h-6 w-40 bg-gray-100 rounded-lg mb-4" />

				{/* Cards skeleton */}
				{Array.from({ length: 3 }).map((_, index) => (
					<View
						// eslint-disable-next-line react/no-array-index-key
						key={index}
						className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-100">
						<View className="flex-row items-start justify-between mb-3">
							<View className="h-5 w-40 bg-gray-100 rounded-lg" />
							<View className="h-5 w-16 bg-gray-100 rounded-full" />
						</View>
						<View className="h-4 w-full bg-gray-100 rounded-lg mb-2" />
						<View className="h-4 w-3/4 bg-gray-100 rounded-lg mb-4" />
						<View className="h-4 w-1/2 bg-gray-100 rounded-lg mb-2" />
						<View className="h-4 w-1/3 bg-gray-100 rounded-lg" />
					</View>
				))}
			</View>
		);
	}

	return (
		<FlashList
			data={castingCalls}
			renderItem={({ item }) => (
				<CastingCallCard
					title={item.title}
					status={mapStatus(item.status)}
					description={item.description}
					submissions={item.applicantCount}
					deadline={item.deadline ? formatDate(item.deadline) : 'N/A'}
					createdDate={formatDate(item.createdAt)}
					projectName={item.projectName}
					location={getLocationLabel(item.location)}
					viewCount={item.viewCount}
					onView={() => handleView(item._id)}
					onManage={() => handleManage(item._id)}
				/>
			)}
			keyExtractor={(item) => item._id}
			ListHeaderComponent={renderHeader}
			ListEmptyComponent={
				!isLoading && !isError ? (
					<View className="py-10 items-center">
						<TextComponent className="text-gray-500">
							You have no casting calls yet.
						</TextComponent>
					</View>
				) : null
			}
			ListFooterComponent={
				(isLoading || isFetchingNextPage) && hasNextPage ? (
					<View className="py-4">
						<ActivityIndicator
							size="small"
							color="#4B5563"
						/>
					</View>
				) : null
			}
			onEndReached={handleEndReached}
			onEndReachedThreshold={0.4}
			refreshing={isRefetching}
			onRefresh={handleRefresh}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 20,
				paddingBottom: 20,
				paddingTop: 20,
			}}
		/>
	);
};

export default memo(DirectorDashboard);
