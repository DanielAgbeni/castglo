import { AxiosResponse } from 'axios';

export type ApiRequestResponseType<T> = Promise<AxiosResponse<T>>;

export type UserRole = 'talent' | 'casting_director' | 'industry_professional' | 'admin';

export interface User {
	_id: string;
	fullName: string;
	email: string;
	role: UserRole;
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

export type ProjectType = 'feature_film' | 'short_film' | 'commercial' | 'music_video' | 'television' | 'theater' | 'web_series' | 'voice_over' | 'other';
export type CompensationType = 'paid' | 'unpaid' | 'deferred' | 'copy_credit';
export type Visibility = 'public' | 'private' | 'invite_only';
export type CastingCallStatus = 'draft' | 'open' | 'closed' | 'cancelled' | 'archived';

export interface Location {
	city: string;
	state: string;
	country?: string;
	remote?: boolean;
}

export interface Budget {
	amount?: number;
	currency: string;
	isNegotiable?: boolean;
}

export interface Role {
	name?: string;
	description?: string;
	ageRange?: {
		min: number;
		max: number;
	};
	gender?: string;
	ethnicity?: string[];
	requiredSkills?: string[];
	_id?: string;
}

export interface Requirements {
	headshot?: boolean;
	resume?: boolean;
	demo?: boolean;
	union?: boolean;
	notes?: string;
}

export interface CastingCall {
	_id: string;
	title: string;
	description: string;
	createdBy: string | User;
	projectName: string;
	projectType: ProjectType;
	budget: Budget;
	location: Location;
	roles: Role[];
	deadline: string;
	visibility: Visibility;
	status: CastingCallStatus;
	media: string[];
	applicantCount: number;
	shortlistedCount: number;
	requirements: Requirements;
	compensationType: CompensationType;
	tags: string[];
	featured: boolean;
	viewCount: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CreateCastingCallRequest {
	title: string;
	description: string;
	projectName: string;
	projectType: string;
	status?: string;
	roles?: { name: string }[];
	budget?: Budget;
	location: { city: string; state: string; remote?: boolean };
	deadline: string;
	media?: string[];
}

export interface CreateCastingCallResponse {
	success: boolean;
	message: string;
	data: CastingCall;
}

export interface CastingCallsPagination {
	page: number;
	limit: number;
	total: number;
	pages: number;
}

export interface CastingCallsResponse {
	success: boolean;
	message: string;
	data: {
		castingCalls: CastingCall[];
		pagination: CastingCallsPagination;
	};
}
