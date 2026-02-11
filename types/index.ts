import { AxiosResponse } from 'axios';

export type ApiRequestResponseType<T> = Promise<AxiosResponse<T>>;
