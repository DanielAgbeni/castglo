import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CastingCallsResponse, CreateCastingCallRequest, CreateCastingCallResponse, CastingCall } from '../types';
import { deleteData, getData, postData, putData } from './index';

const PAGE_SIZE = 10;

export const createCastingCall = async (data: CreateCastingCallRequest) => {
	return postData<CreateCastingCallRequest, CreateCastingCallResponse>('/casting-calls', data);
};

export const useCreateCastingCall = () => {
	return useMutation({
		mutationFn: createCastingCall,
	});
};

export const updateCastingCall = async ({ id, data }: { id: string; data: Partial<CastingCall> }) => {
	return putData<Partial<CastingCall>, CreateCastingCallResponse>(`/casting-calls/${id}`, data);
};

export const closeCastingCall = async (id: string) => {
	return putData<undefined, CreateCastingCallResponse>(`/casting-calls/${id}/close`, undefined);
};

export const deleteCastingCall = async (id: string) => {
	return deleteData<undefined>(`/casting-calls/${id}`);
};

export const getCastingCalls = async ({
	page = 1,
	limit = PAGE_SIZE,
}: {
	page?: number;
	limit?: number;
}) => {
	const response = await getData<CastingCallsResponse>('/casting-calls', {
		params: { page, limit },
	});
	return response.data;
};

export const getMyCastingCalls = async ({
	page = 1,
	limit = PAGE_SIZE,
}: {
	page?: number;
	limit?: number;
}) => {
	const response = await getData<CastingCallsResponse>('/casting-calls/user/my-listings', {
		params: { page, limit },
	});
	return response.data;
};

export const getCastingCallById = async (id: string) => {
	const response = await getData<CreateCastingCallResponse>(`/casting-calls/${id}`);
	return response.data;
};

export const useUpdateCastingCall = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateCastingCall,
		onSuccess: (_res, variables) => {
			queryClient.invalidateQueries({ queryKey: ['casting-call', variables.id] });
			queryClient.invalidateQueries({ queryKey: ['casting-calls', 'my-listings'] });
		},
	});
};

export const useCloseCastingCall = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: closeCastingCall,
		onSuccess: (_res, id) => {
			queryClient.invalidateQueries({ queryKey: ['casting-call', id] });
			queryClient.invalidateQueries({ queryKey: ['casting-calls', 'my-listings'] });
		},
	});
};

export const useDeleteCastingCall = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCastingCall,
		onSuccess: (_res, id) => {
			queryClient.invalidateQueries({ queryKey: ['casting-calls', 'my-listings'] });
			queryClient.removeQueries({ queryKey: ['casting-call', id] });
		},
	});
};

export const useCastingCallsInfinite = () =>
	useInfiniteQuery<CastingCallsResponse>({
		queryKey: ['casting-calls'],
		queryFn: ({ pageParam = 1 }) =>
			getCastingCalls({
				page: pageParam as number,
				limit: PAGE_SIZE,
			}),
		getNextPageParam: (lastPage) => {
			const {
				pagination: { page, pages },
			} = lastPage.data;
			return page < pages ? page + 1 : undefined;
		},
		initialPageParam: 1,
	});

export const useMyCastingCallsInfinite = () =>
	useInfiniteQuery<CastingCallsResponse>({
		queryKey: ['casting-calls', 'my-listings'],
		queryFn: ({ pageParam = 1 }) =>
			getMyCastingCalls({
				page: pageParam as number,
				limit: PAGE_SIZE,
			}),
		getNextPageParam: (lastPage) => {
			const {
				pagination: { page, pages },
			} = lastPage.data;
			return page < pages ? page + 1 : undefined;
		},
		initialPageParam: 1,
	});

export const useCastingCall = (id?: string) =>
	useQuery({
		queryKey: ['casting-call', id],
		queryFn: () => getCastingCallById(id as string),
		enabled: !!id,
	});


