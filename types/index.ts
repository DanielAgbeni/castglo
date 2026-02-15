import { AxiosResponse } from 'axios';

export type ApiRequestResponseType<T> = Promise<AxiosResponse<T>>;

export interface User {
	_id: string;
	fullName: string;
	email: string;
	role: string;
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
