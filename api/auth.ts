import { LoginResponse } from '../types';
import { postData } from './index';

export const login = async (data: any) => {
	return postData<any, LoginResponse>('/auth/login', data);
};

export const register = async (data: any) => {
	return postData<any, LoginResponse>('/auth/register', data);
};
