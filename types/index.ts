import { AxiosResponse } from 'axios';

export type ApiRequestResponseType<T> = Promise<AxiosResponse<T>>;

export interface Role {
	roles: 'talent' | 'casting_director' | 'industry_professional' | 'admin';
}

export interface User {
	_id: string;
	fullName: string;
	email: string;
	role: Role;
	phoneNumber: string;
	emailVerified: boolean;
	emailVerificationExpires: string | null;
	isSuspended: boolean;
	subscriptionStatus: string;
	createdAt: string;
	updatedAt: string;
	lastLogin: string;
	metadata: {
		deviceTokens: string[];
	};
}

export interface LoginResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		user: User;
	};
}

export interface RegisterResponse {
	success: boolean;
	message: string;
	data: {
		token: string;
		user: User;
	};
}
