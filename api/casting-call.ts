import { useMutation } from '@tanstack/react-query';
import { CreateCastingCallRequest, CreateCastingCallResponse } from '../types';
import { postData } from './index';

export const createCastingCall = async (data: CreateCastingCallRequest) => {
	return postData<CreateCastingCallRequest, CreateCastingCallResponse>('/casting-calls', data);
};

export const useCreateCastingCall = () => {
	return useMutation({
		mutationFn: createCastingCall,
	});
};
