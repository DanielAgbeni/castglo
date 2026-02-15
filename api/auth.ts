import { LoginResponse } from '../types';
import { postData } from './index';

export const login = async (data: any) => {
	return postData<any, LoginResponse>('/auth/login', data);
};
