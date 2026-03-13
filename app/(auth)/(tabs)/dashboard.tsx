import { useCastingCallsInfinite } from '@/api/casting-call';
import PreviewCard from '@/components/create-casting-call/PreviewCard';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DirectorDashboard from '@/components/dashboard/DirectorDashboard';
import IndustryProDashboard from '@/components/dashboard/IndustryProDashboard';
import StatsCard from '@/components/dashboard/StatsCard';
import TextComponent from '@/components/TextComponent';
import { useAppStore } from '@/store';
import { CastingCall } from '@/types';
import { FlashList } from '@shopify/flash-list';
import { Medal, Zap } from 'lucide-react-native';
import React, { memo, useCallback, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLocationLabel } from '@/lib/castingCallUtils';

const Dashboard = () => {
	const { user } = useAppStore();
	const activeRole = useAppStore((s) => s.getActiveRole());
	const isDirector = activeRole === 'casting_director';

	const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching } =
		useCastingCallsInfinite();

	const castingCalls = useMemo<CastingCall[]>(
		() => data?.pages.flatMap((page) => page.data.castingCalls) ?? [],
		[data],
	);

	const handleEndReached = useCallback(() => {
		if (isLoading || isFetchingNextPage || !hasNextPage) return;
		fetchNextPage();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, isLoading]);

	const handleRefresh = useCallback(() => {
		refetch();
	}, [refetch]);

	const renderCastingCall = useCallback(
		({ item }: { item: CastingCall }) => (
			<PreviewCard
				title={item.title}
				location={getLocationLabel(item.location)}
				deadline={item.deadline}
				description={item.description}
			/>
		),
		[],
	);

	const keyExtractor = useCallback((item: CastingCall) => item._id, []);

	const renderTalentHeader = () => (
		<View>
			<View className="flex-row justify-between mb-8 gap-x-4">
				<StatsCard
					title="Submissions"
					count={12}
					Icon={Zap}
					iconColor="#0891b2"
					bgColor="#EEFAFF"
				/>
				<StatsCard
					title="Bookings"
					count={3}
					Icon={Medal}
					iconColor="#a855f7"
					bgColor="#FFF0FA"
				/>
			</View>
			<TextComponent className="text-xl font-bold mb-4">
				Upcoming Opportunities
			</TextComponent>
		</View>
	);

	return (
		<SafeAreaView
			className="flex-1"
			edges={['top']}>
			<View className="flex-1 bg-[#AFEEEE]">
				<View className="bg-white px-5 py-4 pb-4">
					<DashboardHeader
						userName={user?.fullName}
						notificationCount={3}
						subtitle={isDirector ? '(Director)' : undefined}
					/>
				</View>

				{isDirector ? (
					<DirectorDashboard />
				) : activeRole === 'industry_professional' ? (
					<IndustryProDashboard />
				) : isLoading && !data ? (
					<View className="flex-1 px-5 pt-5">
						{/* Stats skeleton */}
						<View className="flex-row justify-between mb-8 gap-x-4">
							<View className="flex-1 bg-gray-100 rounded-xl h-24" />
							<View className="flex-1 bg-gray-100 rounded-xl h-24" />
						</View>

						{/* Title skeleton */}
						<View className="h-6 w-52 bg-gray-100 rounded-lg mb-4" />

						{/* Cards skeleton */}
						{Array.from({ length: 4 }).map((_, index) => (
							// eslint-disable-next-line react/no-array-index-key
							<View key={index} className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
								<View className="h-5 w-40 bg-gray-100 rounded-lg mb-2" />
								<View className="h-4 w-24 bg-gray-100 rounded-lg mb-3" />
								<View className="h-32 w-full bg-gray-100 rounded-lg" />
							</View>
						))}
					</View>
				) : (
					<FlashList
						data={castingCalls}
						renderItem={renderCastingCall}
						keyExtractor={keyExtractor}
						ListHeaderComponent={renderTalentHeader}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingHorizontal: 20,
							paddingBottom: 20,
							paddingTop: 20,
						}}
						onEndReached={handleEndReached}
						onEndReachedThreshold={0.4}
						ListEmptyComponent={
							!isLoading && !isError ? (
								<View className="py-10 items-center">
									<TextComponent className="text-gray-500">
										No casting calls available right now.
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
						refreshing={isRefetching}
						onRefresh={handleRefresh}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default memo(Dashboard);
