import { User } from 'types/user';
import { backendApi } from '.';

type GetUserResponse = {
	user: User;
};

export const getUser = (accessToken: string) => backendApi.get<GetUserResponse>('/user', { headers: { accessToken } });
