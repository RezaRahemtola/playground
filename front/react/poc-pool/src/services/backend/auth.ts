import { User } from 'types/user';
import { backendApi } from '.';

type ServiceAuthBody = {
	email: string;
	password: string;
};

type ServiceAuthResponse = {
	user: User;
	accessToken: string;
};

export const register = (data: ServiceAuthBody) => backendApi.post<ServiceAuthResponse>('/auth/register', data);

export const login = (data: ServiceAuthBody) => backendApi.post<ServiceAuthResponse>('/auth/login', data);
