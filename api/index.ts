import axios, { AxiosRequestConfig } from 'axios';
import { ApiRequestResponseType } from '../types';
import { useAppStore } from '../store';
import { DeviceEventEmitter } from 'react-native';

const controller = new AbortController();

const baseURL = 'https://castglo-qupm.onrender.com/api/v1';

const api = axios.create({
	baseURL,
	signal: controller.signal,
});

// Request interceptor for Bearer token
api.interceptors.request.use(
	(config) => {
		const token = useAppStore.getState().token;
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor for Auth errors
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			const { logout } = useAppStore.getState();
			logout();
			DeviceEventEmitter.emit('show-toast', {
				message: 'Session expired. Please login again.',
				type: 'danger',
			});
		}
		return Promise.reject(error);
	}
);

export const setHeaderAuthorization: (token?: string) => void = (token) => {
		if (token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
		} else {
			delete api.defaults.headers.common.Authorization;
		}
	},
	postData: <T, D>(
		url: string,
		data?: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.post(url, data, options);
	},
	getData: <T>(
		url: string,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<T> = (url, options) => {
		return api.get(url, options);
	},
	putData: <T, D>(
		url: string,
		data: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.put(url, data, options);
	},
	patchData: <T, D>(
		url: string,
		data: T | undefined,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<D> = (url, data, options) => {
		return api.patch(url, data, options);
	},
	deleteData: <T>(
		url: string,
		options?: AxiosRequestConfig,
	) => ApiRequestResponseType<T | undefined> = (url, options) => {
		return api.delete(url, options);
	},
	abortOutgoingRequest = () => {
		controller.abort();
	};

export default api;
